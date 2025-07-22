import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  userId!: number;
  user: any = null;
  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.http.get(`http://localhost:3000/users/${this.userId}`).subscribe({
        next: (res) => this.user = res,
        error: (err) => {
          this.errorMsg = 'User not found or server error';
          console.error('Error fetching user:', err);
        }
      });
    } else {
      this.errorMsg = 'Invalid user ID in route';
    }
  }
}
