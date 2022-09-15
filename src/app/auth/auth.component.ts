import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, Subject, takeUntil } from 'rxjs';
import { updateMyInfo } from '../core/store/actions/auth.actions';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
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
    this.loading = true;
    this.form.disable();

    this.authService
      .login({
        identifier,
        password,
      })
      .pipe(
        finalize(() => {
          this.form.enable();
          this.loading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.authService.setToken(data.jwt);
        this.store.dispatch(updateMyInfo());
        if (remember) {
          this.authService.setTokenToCookies(data.jwt);
        }
        this.router.navigate(['/employees']);
      });
  }
}
