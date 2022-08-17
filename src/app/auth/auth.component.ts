import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthorizationResponse } from '../shared/models/interfaces/authorization-response';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  currentForm?: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      remember: [false],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAuthSubmit() {
    const { identifier, password, remember } = this.form.getRawValue();
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    this.form.disable();
    this.authService
      .login({
        identifier,
        password,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.authService.setToken(data.jwt);
          if (remember) {
            this.authService.setTokenToCookies(data.jwt);
          }
          this.router.navigate(['/employees']);
          this.form.reset();
        },
        error: (err) => {
          console.error(err);
          this.message.create('warning', `Authorization error! Status:${err.message}`);
          this.loading = false;
          this.form.enable();
        },
      });
  }
}
