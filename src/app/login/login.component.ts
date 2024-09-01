import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = ''; 
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
    onSubmit(): void {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe(
          response => {
            if (response.success && response.status === 200) {
              this.successMessage = 'You have successfully logged in!';
              this.snackBar.open(this.successMessage, 'Close', {
                duration: 3000,
              });
  
              this.router.navigate(['/user-details'], { state: { user: response.data } });
            } else {
              this.errorMessage = response.message || 'Login failed. Please try again.';
            }
          },
          error => {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        );
      }
    }
}
