import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ThemeToggleService } from '../shared/services/theme/theme-toggle.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  form!: FormGroup;
  checked = true;
  private destroy$ = new Subject<void>();
  currentForm?: FormGroup;

  constructor(
    private themeToggleService: ThemeToggleService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      anoter: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      data: [null, [Validators.required]]
    });
    this.loging();
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

  loging() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log(this.form);
      })
  }
}
