import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { LoginParams, LoginToken, Utilisateur } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService ) { }
  authentificate= (url: string, loginParams: LoginParams): Observable<Utilisateur>=>{
    return this.apiService.get(url, {
      params:loginParams,
      responseType: 'json',
    });
  }
  login = (url: string, loginParams: LoginParams): Observable<LoginToken>=>{
    return this.apiService.post(`${url}Utilisateur/login`,{
      responseType: 'json',
    },loginParams );
  }
  authentification(url: string, token:string|null): Observable<boolean>{
    if (!token) {
      return of(false);
    }
  
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };
  
    // The body should be just the raw token string
    const body = JSON.stringify(token);
  
    return this.apiService.post<boolean>(`${url}Utilisateur/Authentificate`, { headers }, body);
  
  }
  refreshToken(url: string, refreshToken:LoginToken): Observable<LoginToken>{
    return this.apiService.post(`${url}Utilisateur/refresh`,{responseType:'json'},refreshToken);
  }
  logout(url: string, refreshToken: string):Observable<void>{
    return this.apiService.post(`${url}Utilisateur/refresh`,{responseType:'json'},refreshToken);
  }
}
