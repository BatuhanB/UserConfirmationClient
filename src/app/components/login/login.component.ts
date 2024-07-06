import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogComponent } from '../../helper-components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Update the path as necessary
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  openDialog() {
    this.dialog.open(ConfirmationDialogComponent);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (success) => {
          if (success) {
            localStorage.setItem('userId', success.userId);
            console.log(success.code);
            this.openDialog();
          } else {
            this.snackBar.open('Login failed. Please try again.', 'Close', {
              duration: 3000,
            });
          }
        },
        error: (err) => {
          this.snackBar.open(
            err.statusText + ' ' + err.error.message,
            'Close',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }
}
