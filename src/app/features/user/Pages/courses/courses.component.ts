import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../core/Services/course.service'; // Adjust path as per your project structure
import { CoursesInfo } from '../../../../core/Models/api.interfaces'; // Adjust path
import { CourseCardComponent } from '../../../../Shared/Components/course-card/course-card.component';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent , FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CoursesInfo[] = [];
  filteredCourses: BehaviorSubject<CoursesInfo[]> = new BehaviorSubject<CoursesInfo[]>([]);
  errorMessage: string | null = null;
  filterText: string = 'All';
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.courses = res.data as CoursesInfo[]; // Assuming data contains the array of courses
          this.filteredCourses.next(this.courses);
          console.log('Courses loaded:', this.courses);
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
  filterCourses() {
    if (this.filterText === 'All') {
      this.filteredCourses.next(this.courses);
    } else {
      this.filteredCourses.next(this.courses.filter(course => course.price == 0));
    }
  }
  freecourses() {
    this.filterText = this.filterText === 'All' ? 'Free' : 'All';
    this.filterCourses();
  }
}