import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      this.http.post('http://localhost:8080/api/signup', formData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).subscribe({
        next: (res) => {
          console.log('✅ Signup success:', res);
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('❌ Signup failed:', err);
          alert('Signup failed!');
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
