import { Component, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
})
export class AppSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Input';
  @Input('options') nzOptions!: NzCascaderOption[];

  //nzOptions: NzCascaderOption[] = options;

  control = new FormControl();
  private destroy$ = new Subject<void>();
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(@Self() public ngControl: NgControl, private fb: FormBuilder) {
    this.ngControl.valueAccessor = this;
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
