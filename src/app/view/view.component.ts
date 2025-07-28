import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.authService.getUserById(id).subscribe({
        next: (res) => {
         this.user = {
             username: res.data.username,
            email: res.data.email
};

        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    } else {
      console.error('Invalid user ID');
    }
  }
}
