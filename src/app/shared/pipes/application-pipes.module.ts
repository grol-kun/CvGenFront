import { NgModule } from '@angular/core';
import { ErrorMessagePipe } from './error-message.pipe';

@NgModule({
  imports: [],
  declarations: [
    ErrorMessagePipe
  ],
  exports: [
    ErrorMessagePipe
  ]
})
export class ApplicationPipesModule { }
