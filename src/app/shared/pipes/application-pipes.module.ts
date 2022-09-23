import { NgModule } from '@angular/core';
import { CvModalFilterPipe } from './cv-modal-filter.pipe';
import { ErrorMessagePipe } from './error-message.pipe';
import { FilterPipe } from './filter.pipe';
import { GetFieldPipe } from './get-field.pipe';
import { TableFilterPipe } from './table-filter.pipe';

@NgModule({
  imports: [],
  declarations: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe, TableFilterPipe, GetFieldPipe],
  exports: [ErrorMessagePipe, FilterPipe, CvModalFilterPipe, TableFilterPipe, GetFieldPipe],
})
export class ApplicationPipesModule {}
