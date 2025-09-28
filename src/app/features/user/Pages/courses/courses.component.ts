import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../core/Services/course.service'; // Adjust path as per your project structure
import { CoursesInfo } from '../../../../core/Models/api.interfaces'; // Adjust path
import { CourseCardComponent } from '../../../../Shared/Components/course-card/course-card.component';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

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
  itemsPerPage: number = 4;

  params = new HttpParams().set('offset', '0').set('limit', this.itemsPerPage.toString()).set('free', '0');

  currentpage: number = 1;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(params?: HttpParams) {

    this.courseService.getCourses(params || this.params).subscribe({
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
  freecourses() {
    this.loadCourses(this.params.set('free', '1'));
  }

  filterCourses() {
    if (this.filterText === 'All') {
      // this.filteredCourses.next(this.courses);
      this.loadCourses(this.params.set('free', '0'));
    } else {
      // this.filteredCourses.next(this.courses.filter(course => course.price == 0));
      this.loadCourses(this.params.set('free', '1'));
    }
  }
  limitChange() {
    this.params = this.params.set('limit', this.itemsPerPage.toString());
    this.loadCourses(this.params);
  }
  next(){
    this.currentpage++;
    const offset = (this.currentpage - 1) * this.itemsPerPage;
    this.params = this.params.set('offset', offset.toString());
    if(this.filteredCourses.value.length < this.itemsPerPage || this.filteredCourses.value.length == 0){
      console.log("No more data");
      return;
    }

    this.loadCourses(this.params);
  }
  previous(){
    if(this.currentpage > 1){
      this.currentpage--;
      const offset = (this.currentpage - 1) * this.itemsPerPage;
      this.params = this.params.set('offset', offset.toString());
      this.loadCourses(this.params);
    }
  }
}