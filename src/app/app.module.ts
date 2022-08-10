import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from './core/services/theme/theme-local-storage.service';
import { ThemeToggleService } from './core/services/theme/theme-toggle.service';

export function themeFactory(themeService: ThemeToggleService) {
  return () => themeService.setThemeOnStart()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ThemeToggleService,
    StorageService,
    {
      provide: APP_INITIALIZER,
      useFactory: themeFactory,
      deps: [ThemeToggleService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
