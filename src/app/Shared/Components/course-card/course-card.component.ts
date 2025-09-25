import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesInfo } from '../../../core/Models/api.interfaces'; // Adjust path

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: CoursesInfo;

  ngOnInit(): void {
    if (!this.course) {
      console.warn('No course data provided to CourseCardComponent');
    }
  }
}