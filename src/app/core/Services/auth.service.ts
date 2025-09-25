import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

type Step1Data = {
  register_method: string;
  country_code: string;
  mobile: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type Step2Data = {
  user_id: string;
  full_name: string;
  referral_code: string | null;
};

type LoginData = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Base URL from the task
  private baseUrl = 'https://lms.klydar.com/api/development/';

  isLogin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Check if token exists on init to set login state
    if (localStorage.getItem('token')) {
      this.isLogin.next(true);
    }
  }

  registerStep1(data: Step1Data): Observable<any> {
    return this.http.post(
      `${this.baseUrl}register/step/1`,
      data
    );
  }

  registerStep2(data: Step2Data): Observable<any> {
    return this.http.post(
      `${this.baseUrl}register/step/3`,
      data
    );
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}login`,
      data
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isLogin.next(true);
  }

  logOut() {
    this.isLogin.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}