import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  toggle() {
    this.themeService.toggleTheme();
  }

  isDark() {
    return this.themeService.isDarkTheme;
  }
}
