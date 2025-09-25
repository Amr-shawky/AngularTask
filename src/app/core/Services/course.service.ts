import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse , CoursesInfo } from '../Models/api.interfaces'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'https://lms.klydar.com/api/development/';

  constructor(private http: HttpClient) {}

  // Fetch list of courses
  getCourses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}courses`);
  }

  // Fetch details of a specific course
  getCourseDetails(courseId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}courses/${courseId}`);
  }
}