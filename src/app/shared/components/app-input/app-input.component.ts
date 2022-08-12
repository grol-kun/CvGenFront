import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() public label?= 'Input';
  @Input() public placeholder?= 'placeholder';
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  writeValue(value: any): void {
    if (value) {
      this.ngControl.control?.setValue(value, { emitEvent: false });
    }
  }
}
