import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Add this
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule], // ✅ Add FormsModule here
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userData = {
    name: '',
    email: '',
    role: '',
    gender: '',
    age: ''
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/users/${id}`).subscribe((data: any) => {
        this.userData = data;
      });
    }
  }

  onUpdateUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.put(`http://localhost:3000/users/${id}`, this.userData).subscribe(() => {
        alert('User updated successfully');
        this.router.navigate(['/users']);
      });
    }
  }
}
