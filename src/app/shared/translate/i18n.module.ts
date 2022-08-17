import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nComponent } from './i18n/i18n.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzIconModule } from 'ng-zorro-antd/icon';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [I18nComponent],
  imports: [CommonModule, NzDropDownModule, NzIconModule],
  providers: [TranslateStore],
  exports: [I18nComponent, TranslateModule],
})
export class I18nModule {}
