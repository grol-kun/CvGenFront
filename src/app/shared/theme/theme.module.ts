import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeStorageService, THEME_STORAGE_SERVICE } from './theme-storage.service';
import { ThemeService } from './theme.service';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [CommonModule],
  providers: [
    ThemeService,
    {
      provide: THEME_STORAGE_SERVICE,
      useClass: ThemeStorageService,
    },
  ],
  exports: [ThemeComponent],
})
export class ThemeModule {}
