import { Component, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID) as Object;
  private authService = inject(AuthService);
isBrowser = isPlatformBrowser(this.platformId );

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const loginData = this.loginForm.value;

    this.authService.loginUser(loginData).subscribe({
      next: (res: any) => {
        console.log('✅ Login Success:', res);

        if (this.isBrowser) {
          localStorage.setItem('token', res.data.token);
        }

        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('❌ Login Error:', err);
      }
    });
  }
}
