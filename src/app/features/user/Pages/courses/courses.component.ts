import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../core/Services/course.service'; // Adjust path as per your project structure
import { CoursesInfo } from '../../../../core/Models/api.interfaces'; // Adjust path
import { CourseCardComponent } from '../../../../Shared/Components/course-card/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CoursesInfo[] = [];
  errorMessage: string | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.courses = res.data as CoursesInfo[]; // Assuming data contains the array of courses
        } else {
          this.errorMessage = res.message || 'Failed to load courses.';
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Unable to fetch courses. Please try again later.';
        console.error(err);
      }
    });
  }
}