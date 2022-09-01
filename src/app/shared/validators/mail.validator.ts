import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MailValidatorService {
  checkMailFormat(contol: FormControl) {
    const myReg = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$');
    const ok = myReg.exec(contol.value);
    if (!ok) {
      return {
        mailFormatError: true,
      };
    }
    return null;
  }
}
