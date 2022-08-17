import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  currentForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      remember: [false]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAuthSubmit() {
    this.form.markAllAsTouched();
    const { identifier, password } = this.form.getRawValue();

    if (this.form.valid) {
      const remember = this.form.get('remember')?.value;
      this.authService.login({
        identifier,
        password,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            console.log(data);
            this.authService.setToken(data.jwt);
            if (remember) {
              this.authService.setTokenToCookies(data.jwt);
            }
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            console.error(err);
            this.message.create('warning', `Authorization error! Status:${err.message}`);
          }
        })
      this.form.reset();
    }
  }
}
