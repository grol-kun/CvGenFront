import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ThemeToggleService } from '../shared/services/theme/theme-toggle.service';

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
    private themeToggleService: ThemeToggleService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      checked: [false]
    });
    this.justForTests();
  }

  toggleTheme() {
    this.themeToggleService.toggle();
  }

  isDark(): boolean {
    return this.themeToggleService.isDarkThemeSelected();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  justForTests() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log(this.form);
      })
  }
}
