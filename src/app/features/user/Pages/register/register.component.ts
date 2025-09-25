import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/Services/auth.service'; // Adjust path as per your project structure
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  
  isLoading: boolean = false;
  currentStep = 1;
  private modeSubscription!: Subscription; // Removed mode service since no dark/light mode
  errorMessage: string | null = null;

  ngOnInit() {
    // No initial loading simulation or spinner logic
  }

  ngOnDestroy(): void {
    if (this.modeSubscription) {
      this.modeSubscription.unsubscribe();
    }
  }

  // Step 1 Form (Account Info)
  step1Form = new FormGroup({
    register_method: new FormControl('mobile', Validators.required),
    country_code: new FormControl('0020', Validators.required),
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl('', Validators.required)
  }, { validators: this.matchPasswordValidator });

  // Step 2 Form (User Info)
  step2Form = new FormGroup({
    user_id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    full_name: new FormControl('', Validators.required),
    referral_code: new FormControl(null)
  });

  // Custom validator for matching password and password_confirmation
  matchPasswordValidator(control: any) {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('password_confirmation')?.value;
    return password === passwordConfirmation ? null : { mismatch: true };
  }

  get getRegisterMethodControl() { return this.step1Form.get('register_method'); }
  get getCountryCodeControl() { return this.step1Form.get('country_code'); }
  get getMobileControl() { return this.step1Form.get('mobile'); }
  get getEmailControl() { return this.step1Form.get('email'); }
  get getPasswordControl() { return this.step1Form.get('password'); }
  get getPasswordConfirmationControl() { return this.step1Form.get('password_confirmation'); }
  get getUserIdControl() { return this.step2Form.get('user_id'); }
  get getFullNameControl() { return this.step2Form.get('full_name'); }
  get getReferralCodeControl() { return this.step2Form.get('referral_code'); }

  onStep1Submit() {
    if (this.step1Form.invalid) {
      this.step1Form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const step1Data = {
      register_method: this.step1Form.get('register_method')?.value || 'mobile',
      country_code: this.step1Form.get('country_code')?.value || '0020',
      mobile: this.step1Form.get('mobile')?.value || '0',
      email: this.step1Form.get('email')?.value || '',
      password: this.step1Form.get('password')?.value || '',
      password_confirmation: this.step1Form.get('password_confirmation')?.value || ''
    };
    this.authService.registerStep1(step1Data).subscribe({
      next: (res: any) => {
        this.step2Form.get('user_id')?.setValue(res.user_id?.toString() || ''); // Assuming API returns user_id
        this.currentStep = 2;
        this.isLoading = false;
        console.log(res);
        this.toastr.success('Step 1 completed successfully! Please proceed to Step 3.', 'Success');
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error?.error?.message || 'Step 1 registration failed. Please try again.';
        this.toastr.error(this.errorMessage!, 'Error');
        this.isLoading = false;
      }
    });
  }

  onStep2Submit() {
    if (this.step2Form.invalid) {
      this.step2Form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const step2Data = {
      user_id: this.step2Form.get('user_id')?.value || '0',
      full_name: this.step2Form.get('full_name')?.value || '',
      referral_code: this.step2Form.get('referral_code')?.value ?? null
    };
    this.authService.registerStep2(step2Data).subscribe({
      next: () => {
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']); // Redirect to Login Page as per task
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Step 3 registration failed. Please try again.';
        this.toastr.error(this.errorMessage!, 'Error');
        this.isLoading = false;
      }
    });
  }
}