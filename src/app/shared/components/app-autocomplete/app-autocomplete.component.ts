import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'app-app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.scss']
})
export class AppAutocompleteComponent implements ControlValueAccessor {
  @Input() public label?= 'Input';
  @Input() public placeholder?= 'placeholder';
  private onChange = (value: any) => { };
  private onTouched = () => { };

  inputValue: Option = { label: 'Lucy', value: 'lucy', age: 20 };
  options: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  compareFun = (o1: Option | string, o2: Option): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  writeValue(value: any): void {
    if (value) {
      this.ngControl.control?.setValue(value, { emitEvent: false });
    }
  }
}
