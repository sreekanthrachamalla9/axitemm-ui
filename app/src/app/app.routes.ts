import { Routes } from '@angular/router';
import { SignupComponent } from '../app/globals/components/signup/signup.component';
import { UserListComponent } from '../app/globals/components/user-list/user-list.component';
import { EditUserComponent } from '../app/globals/components/edit-user/edit-user.component';
import { ViewComponent } from '../app/globals/components/view/view.component';
import { LoginComponent } from '../app/globals/components/login/login.component';
import { AddUserComponent } from '../app/globals/components/add-user/add-user.component';

export const routes: Routes = [
    { path: '', component: SignupComponent },
    { path: 'signUp', component: SignupComponent },
    { path: 'users', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    {path:'view/:id', component: ViewComponent},
    {path: 'add-user', component: AddUserComponent},
];
