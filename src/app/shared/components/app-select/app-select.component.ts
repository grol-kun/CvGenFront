import { Component, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NgControl } from '@angular/forms';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
})
export class AppSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Input';
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Please select...';
  @Input() nzMode: NzSelectModeType = 'default';

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
    this.control!.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => this.onChange(value));
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
