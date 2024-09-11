import { Component, Input ,} from '@angular/core';
import { UserService } from '../../service/user.service';
import { environment } from '../../environment/environment';
import { Utilisateur } from '../../../types';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });
  constructor(
    private userService:UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  login(){
    console.log('Form validity:', this.loginForm.valid); // Add log here
    console.log('Form values:', this.loginForm.value); // Add log here
    if (this.loginForm.valid) {
      
      const email = String(this.loginForm.get('email')?.value);
      const password = String(this.loginForm.get('password')?.value);
      this.authService.login({email, password});
        this.userService.authentificate(`${environment.apiUrl}utilisateur/Authentification`, { email, password })
        .subscribe((utilisateur: Utilisateur) => {
          sessionStorage.setItem('userId', utilisateur.id.toString())
          console.log(utilisateur);
          this.router.navigate(['/home']);
        }, error => {
          console.error('Login failed', error);
        });
    }else {
      console.log('Form is invalid');
    }
  }
}
