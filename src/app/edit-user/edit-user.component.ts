import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  editForm!: FormGroup;
  id: any;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.authService.getUserById(this.id).subscribe((res: any) => {
        this.editForm.patchValue({
          username: res.data.username,
          email: res.data.email,
        });

        this.authService.getDashboard().subscribe((res: any) => {
          const user = res.data.find((u: any) => u.id === +this.id);
          if (user) {
            this.editForm.patchValue({ password: user.password });
          }
        });
      });
    }
      

  }

  onUpdateUser(): void {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
      this.authService.updateUser(this.id, updatedUser).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
