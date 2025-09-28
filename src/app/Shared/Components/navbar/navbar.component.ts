import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router ,
    public authService: AuthService
  ) {}

//     { path: 'login', loadComponent: () => import('./features/user/Pages/login/login.component').then(m => m.LoginComponent) },
//     {path:'register', loadComponent: () => import('./features/user/Pages/register/register.component').then(m => m.RegisterComponent) },
//     {path:'courses', loadComponent: () => import('./features/user/Pages/courses/courses.component').then(m => m.CoursesComponent) },
//     {path:'course-details/:id', loadComponent: () => import('./features/user/Pages/course-details/course-details.component').then(m => m.CourseDetailsComponent) },
//     {path:'profile', loadComponent: () => import('./features/user/Pages/profile/profile.component').then(m => m.ProfileComponent) },
// ];

  pages:{title:string, path:string}[] = [
    {title: 'Courses', path: '/courses'},
    {title: 'Profile', path: '/profile'},
  ];
  authpages:{title:string, path:string}[] = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
  ];

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
