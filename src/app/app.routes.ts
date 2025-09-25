import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/Pages/login/login.component';
import { RegisterComponent } from './features/user/Pages/register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./features/user/Pages/login/login.component').then(m => m.LoginComponent) },
    {path:'register', loadComponent: () => import('./features/user/Pages/register/register.component').then(m => m.RegisterComponent) },
    {path:'courses', loadComponent: () => import('./features/user/Pages/courses/courses.component').then(m => m.CoursesComponent) },
    {path:'course-details/:id', loadComponent: () => import('./features/user/Pages/course-details/course-details.component').then(m => m.CourseDetailsComponent) },
    {path:'profile', loadComponent: () => import('./features/user/Pages/profile/profile.component').then(m => m.ProfileComponent) },
];
