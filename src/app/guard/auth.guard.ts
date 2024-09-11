import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const isAuthenticated = await firstValueFrom(this.authService.isAuthenticated());
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/sign-in']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
