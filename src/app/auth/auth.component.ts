import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { ThemeToggleService } from '../core/services/theme/theme-toggle.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  checked = true;

  constructor(
    private themeToggleService: ThemeToggleService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    }, { updateOn: 'blur' });
  }


  toggleTheme() {
    this.themeToggleService.toggle();
  }

  isDark(): boolean {
    return this.themeToggleService.isDarkThemeSelected();
  }


}
