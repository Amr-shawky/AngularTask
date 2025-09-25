import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/Services/auth.service'; // Adjust path as per your project structure
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData as { username: string; password: string }).subscribe({
        next: (res) => {
          if (res.success === false) {
            this.errorMessage = res.message || 'Login failed. Please check your credentials.';
            console.log(res);
            console.error(this.errorMessage);
            return;
          }
          this.authService.saveToken(res.token);
          console.log('response:', res);
          console.log('Login successful');
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error(err);
          console.log('Login attempt failed'); 
        }
      });
    }
  }
}