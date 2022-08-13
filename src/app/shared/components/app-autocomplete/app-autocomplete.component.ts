import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

interface Option {
  label: string;
  value: string;
  age: number;
}
//For example....

@Component({
  selector: 'app-app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.scss']
})
export class AppAutocompleteComponent implements ControlValueAccessor {
  @Input() public label: string = 'Autocomplete';
  @Input() public placeholder: string = 'placeholder';
  private destroy$ = new Subject<void>();
  public control = new FormControl();
  private onChange = (value: any) => { };
  private onTouched = () => { };

  //For example,too....
  inputValue: Option = { label: 'Lucy', value: 'lucy', age: 20 };
  options: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  ngOnInit(): void {
    this.control!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(value + '1');
        console.log(`value ${value}`);
        console.log(`control`, this.control);
        console.log(`ngControl`, this.ngControl);
      })
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  compareFun = (o1: Option | string, o2: Option): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
