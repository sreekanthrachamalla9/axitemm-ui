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
    username:'',
  };

 onSubmit() {
    const payload = { ...this.signupData };

    // ✅ Safely delete 'id' if it somehow exists
    if ('id' in payload) {
      delete payload['id'];
    }

    console.log('🚀 Final payload being sent:', payload);

    this.authService.registerUser(this.signupData).subscribe(
      (res: any) => {
        console.log('✅ Response from json-server:', res);

        // Check what ID you get
        if (typeof res.id === 'string') {
          console.warn('⚠️ ID is a string:', res.id);
        } else {
          console.log('✅ ID is a number:', res.id);
        }

        alert('Signup successful!');
        this.router.navigate(['/users']);
      },
      err => {
        console.error('❌ Signup error:', err);
      }
    );
  }
}
