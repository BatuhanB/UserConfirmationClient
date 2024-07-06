import { AuthService } from './../../services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  form: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.min(6)]],
    });
  }

  confirmCode() {
    if (this.form.valid) {
      var codeVal = this.form.get('code').value;
      var userId = localStorage.getItem("userId");
      this.auth.confirm(userId,codeVal).subscribe({
        next: (result) => {
          console.log(result.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
