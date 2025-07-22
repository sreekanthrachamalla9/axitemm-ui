import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  ngOnInit() {
  this.authService.getUsers().subscribe(data => {
    this.users = data;  // 👌 id is already a number
  });
}


  getUsers(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (data) => (this.users = data),
      (err) => console.error('Error fetching users:', err)
    );
  }

  onAddUser(): void {
    this.router.navigate(['/signup']);
  }

  editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }
   loadUsers(): void {
  this.authService.getUsers().subscribe((data: any[]) => {
    this.users = data
      .filter(user => !isNaN(Number(user.id)))                          // ✅ Keep only numeric IDs
      .map(user => ({ ...user, id: Number(user.id) }))                  // ✅ Convert all IDs to number
      .sort((a, b) => a.id - b.id);                                     // ✅ Now sort will work
  });
}


  viewUser(id: number): void {
    this.router.navigate(['/view', id]);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(
        () => this.getUsers(),
        (err) => console.error('Error deleting user:', err)
      );
    }
  }
}
