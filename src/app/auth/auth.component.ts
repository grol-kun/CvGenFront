import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from '../core/services/theme/theme-toggle.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private themeToggleService: ThemeToggleService) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeToggleService.toggle();
  }

  isDark(): boolean {
    return this.themeToggleService.isDarkThemeSelected();
  }
}
