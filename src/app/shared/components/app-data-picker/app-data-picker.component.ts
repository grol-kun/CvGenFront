import { Component, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-app-data-picker',
  templateUrl: './app-data-picker.component.html',
  styleUrls: ['./app-data-picker.component.scss']
})
export class AppDataPickerComponent {
  date = null;
  @Input() public label?= 'Input';
  @Input() public placeholder!: string | string[];
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(
    @Self() public ngControl: NgControl
  ) {
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
