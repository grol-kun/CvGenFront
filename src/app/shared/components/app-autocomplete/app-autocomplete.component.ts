import { AfterViewInit, Component, Input, OnChanges, Self, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./app-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppAutocompleteComponent implements ControlValueAccessor, OnChanges {
  @Input() label = 'Autocomplete';
  @Input() placeholder = 'placeholder';
  @Input('options') InputOptions?: any[];
  options!: string[];

  private destroy$ = new Subject<void>();
  private onChange = (value: any) => {};
  private onTouched = () => {};
  control = new FormControl();
  //options: any;

  //For example,too....
  //inputValue: Option = { label: 'Lucy', value: 'lucy', age: 20 };
  /* options: Option[] = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 },
  ]; */

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = changes?.['InputOptions']?.currentValue;
    console.log('this.options : ', this.options);
  }

  registerOnChange = (fn: (value: any) => {}) => (this.onChange = fn);
  registerOnTouched = (fn: () => {}) => (this.onTouched = fn);

  ngOnInit(): void {
    this.control!.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  compareFn = (o1: string, o2: string): boolean => {
    if (o1) {
      return o2.toLowerCase().includes(o1.toLowerCase());
    }
    return false;
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
