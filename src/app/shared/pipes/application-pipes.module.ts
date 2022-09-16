import { NgModule } from '@angular/core';
import { CvModalFilterPipe } from './cv-modal-filter.pipe';
import { ErrorMessagePipe } from './error-message.pipe';
import { FilterPipe } from './filter.pipe';
import { TableFilterPipe } from './table-filter.pipe';

@NgModule({
  imports: [],
  declarations: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe, TableFilterPipe],
  exports: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe, TableFilterPipe],
})
export class ApplicationPipesModule {}
