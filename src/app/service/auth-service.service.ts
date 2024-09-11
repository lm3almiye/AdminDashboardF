import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from '../environment/environment';
import { LoginParams, LoginToken } from '../../types';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { Token } from '@angular/compiler';
import { error } from 'console';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, private router: Router) {}

  
  login(loginParams: LoginParams):void{
    this.userService.login(environment.apiUrl,loginParams).subscribe(
      (response) => {
        localStorage.setItem("token",response.token);
        localStorage.setItem("refreshToken",response.refreshToken);
        
      }, error=>{
        console.log(error);
      }
    );
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refreshToken') ?? '';

    // Call the server to revoke the refresh token
    this.userService.logout(environment.apiUrl, refreshToken).subscribe(
      () => {
        // Clear the local storage
        localStorage.clear();

        // Update authentication status
        this.isAuthenticatedSubject.next(false);

      },
      (error) => {
        console.log('Error logging out:', error);
      }
    );
  }
  isAuthenticated(): Observable<boolean> {
    const loginToken = {
      token: localStorage.getItem('token') ?? '',
      refreshToken: localStorage.getItem('refreshToken') ?? '',
    };

    return this.userService.authentification(environment.apiUrl, loginToken.token).pipe(
      switchMap((response: boolean) => {
        if (response) {
          this.isAuthenticatedSubject.next(true);
          return of(true);
        } else {
          return this.userService.refreshToken(environment.apiUrl, loginToken).pipe(
            switchMap((refreshResponse: any) => {
              if (refreshResponse) {
                localStorage.setItem('token', refreshResponse.token);
                localStorage.setItem('refreshToken', refreshResponse.refreshToken);
                this.isAuthenticatedSubject.next(true);
                return of(true);
              } else {
                this.isAuthenticatedSubject.next(false);
                return of(false);
              }
            }),
            catchError(() => {
              this.isAuthenticatedSubject.next(false);
              return of(false);
            })
          );
        }
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
