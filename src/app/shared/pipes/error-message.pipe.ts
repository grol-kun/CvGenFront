import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { commonErrors } from '../models/constants/error.constant'
import { ErrorMessages } from '../models/interfaces/error-messages';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined, addintional: ErrorMessages = {}): string {
    if (!errors) {
      return '';
    }

    const controlErrors = {
      ...commonErrors,
      ...addintional,
    };

    return controlErrors[Object.keys(errors)[0]];
  }

}
