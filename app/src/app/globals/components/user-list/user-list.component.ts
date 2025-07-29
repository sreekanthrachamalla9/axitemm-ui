import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers(); // ✅ Load users from real API on init
  }

  // ✅ Load users using service
  loadUsers(): void {
    this.authService.getDashboard().subscribe({
      next: (res: any) => {
        this.users = res?.data || res;
        console.log('Users loaded:', this.users);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  // ✅ Navigate to signup
  onAddUser(): void {
    this.router.navigate(['/signup']);
  }

  // ✅ Navigate to edit-user page
  editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }

  // ✅ Navigate to view-user page
  viewUser(id: number): void {
    this.router.navigate(['/view', id]);
  }

  // ✅ Delete user using real API
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          console.log(`User ${id} deleted`);
          this.loadUsers(); // Reload after deletion
        },
        error: (err) => {
          console.error('Delete failed:', err);
        }
      });
    }
  }
}
