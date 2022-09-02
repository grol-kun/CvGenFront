import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateControlComponent } from './translate-control/translate-controlcomponent';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateControlService } from './translate-control.service';
import { TranslateStorageService } from './translate-storage.service';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [TranslateControlComponent],
  imports: [CommonModule, NzDropDownModule, TranslateModule],
  providers: [TranslateStore, TranslateControlService, TranslateStorageService],
  exports: [TranslateControlComponent, TranslateModule],
})
export class TranslateControlModule {}
