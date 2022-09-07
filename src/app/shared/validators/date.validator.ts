import { FormGroup } from '@angular/forms';

export function DateValidator(control: FormGroup): { [key: string]: boolean } | null {
  const from = control.get('from');
  const to = control.get('to');

  if (!from?.value || !to?.value) {
    return null;
  }

  const fromValue = new Date(from?.value);
  const toValue = new Date(to?.value);

  if (fromValue > toValue) {
    return {
      dates: true,
    };
  }
  return null;
}
