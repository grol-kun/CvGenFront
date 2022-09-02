import { NgModule } from '@angular/core';
import { ErrorMessagePipe } from './error-message.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [ErrorMessagePipe, FilterPipe],
  exports: [ErrorMessagePipe, FilterPipe],
})
export class ApplicationPipesModule {}
