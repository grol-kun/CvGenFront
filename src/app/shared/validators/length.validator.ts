import { FormControl } from "@angular/forms";

export function validateLength(control: FormControl) {
  let err = {
    lengthError: {
      given: control.value,
      max: 10,
      min: 3
    }
  };

  return (control.value.length > 10 || control.value.length < 3) ? err : null;
}
