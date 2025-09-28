import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../../core/Services/profile.service'; // Adjust path as per your project structure
import { ToastrService } from 'ngx-toastr'; // Optional, for notifications

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fullName: string | null = null;
  email: string | null = null;
  mobile: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService // Optional
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        if (res.success === false) {
          this.errorMessage = res.message || 'Failed to load profile data.';
          this.toastr.error(this.errorMessage!, 'Error'); // Optional
          return;
        }
        this.fullName = res.data.user.full_name || 'Not available';
        this.email = res.data.user.email || 'Not available';
        this.mobile = res.data.user.mobile || 'Not available';
      },
      error: (err) => {
        this.errorMessage = 'Unable to fetch profile data. Please try again later.';
        this.toastr.error(this.errorMessage, 'Error'); // Optional
        console.error(err);
      }
    });
  }
}