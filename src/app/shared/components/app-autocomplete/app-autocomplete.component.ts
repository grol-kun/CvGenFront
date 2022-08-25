import { Component, Input, OnChanges, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.scss'],
})
export class AppAutocompleteComponent implements ControlValueAccessor, OnChanges {
  @Input() label = 'Autocomplete';
  @Input() placeholder = 'placeholder';
  @Input('options') inputOptions: string[] = [];
  options!: string[];

  private destroy$ = new Subject<void>();
  private onChange = (value: any) => {};
  private onTouched = () => {};
  control = new FormControl();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = changes?.['inputOptions']?.currentValue;
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
