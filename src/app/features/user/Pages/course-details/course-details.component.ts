import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../core/Services/course.service'; // Adjust path
import { CoursesInfo,ApiResponse } from '../../../../core/Models/api.interfaces'; // Adjust path

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: CoursesInfo | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadCourseDetails();
  }

  loadCourseDetails() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.courseService.getCourseDetails(id).subscribe({
        next: (res: ApiResponse) => {
          if (res.success) {
            this.course = res.data as unknown as CoursesInfo; // Assuming data contains a single CoursesInfo object
          } else {
            this.errorMessage = res.message || 'Failed to load course details.';
          }
        },
        error: (err: any) => {
          this.errorMessage = 'Unable to fetch course details. Please try again later.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Invalid course ID.';
    }
  }
}