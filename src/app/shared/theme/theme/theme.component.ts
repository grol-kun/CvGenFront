import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  public isDark$!: Observable<boolean>;
  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe((isDark: any) => {
      this.isDark$ = isDark;
    });
  }

  public toggle() {
    this.themeService.toggleTheme();
  }
}
