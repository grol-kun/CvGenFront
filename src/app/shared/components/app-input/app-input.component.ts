import { Component, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
})
export class AppInputComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() label = 'Input';
  @Input() placeholder = 'placeholder';
  @Input() isPassword = false;

  control = new FormControl();
  textVisible = true;

  private destroy$ = new Subject<void>();
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isPassword = changes?.['isPassword']?.currentValue;

    if (isPassword) {
      this.textVisible = false;
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
