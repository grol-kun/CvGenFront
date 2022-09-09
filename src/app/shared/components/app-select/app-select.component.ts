import { Component, Input, OnDestroy, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NgControl } from '@angular/forms';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
})
export class AppSelectComponent implements ControlValueAccessor, OnDestroy {
  @Input() label = 'Input';
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Please select...';
  @Input() nzMode: NzSelectModeType = 'default';

  control = new FormControl();
  private destroy$ = new Subject<void>();
  private onTouched = () => {};

  constructor(@Self() public ngControl: NgControl, private fb: FormBuilder) {
    this.ngControl.valueAccessor = this;
  }

  registerOnTouched = (fn: () => {}) => (this.onTouched = fn);

  public registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        tap(() => this.control.markAsTouched()),
        takeUntil(this.destroy$)
      )
      .subscribe(fn);
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
