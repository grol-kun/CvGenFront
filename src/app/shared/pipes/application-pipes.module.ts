import { NgModule } from '@angular/core';
import { CvModalFilterPipe } from './cv-modal-filter.pipe';
import { ErrorMessagePipe } from './error-message.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe],
  exports: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe],
})
export class ApplicationPipesModule {}
