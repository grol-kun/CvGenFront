import { AbstractControl, Validators } from "@angular/forms";

export class RequiredText {
  validate(ctrl: AbstractControl) {
    return Validators.required(ctrl);
  }
}
