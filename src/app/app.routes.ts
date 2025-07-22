import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
     { path: '', component: SignupComponent },
     { path: 'signUp', component: SignupComponent },
     { path: 'users', component: UserListComponent },
     { path: 'edit-user/:id', component: EditUserComponent },
     {
  path: 'view/:id',
  loadComponent: () => import('./view/view.component').then(m => m.ViewComponent)
}

];
