import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Add this
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, ],
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router, httpClient: HttpClient) {}

  signupData = {
    name: '',
    email: '',
    password: '',
    role:'',
    confirmPassword: '',
    age: '',
    gender: '',
  };

  onSubmit() {
    console.log('Submitting:', this.signupData);

    this.authService.registerUser(this.signupData).subscribe(
      res => {
        console.log('User registered:', res);
        alert('Signup successful!');
        this.router.navigate(['/users']); // ✅ Redirect to user list
      },
      err => {
        console.error('Signup error:', err);
      }
    );
  }
}
