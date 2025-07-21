import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
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


  editUser(id: number) {
  this.router.navigate(['/edit-user', id]);
}

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(
        () => {
          this.getUsers(); // Refresh the list after deletion
        },
        (err) => console.error('Error deleting user:', err)
      );
    }
  }
  viewUser(id: number): void {
    this.router.navigate(['/view', id]);
  }
}
