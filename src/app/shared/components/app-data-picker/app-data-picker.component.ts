import { Component, Input, OnChanges, Self, SimpleChanges } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ErrorMessages } from '../../models/interfaces/error-messages';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-app-data-picker',
  templateUrl: './app-data-picker.component.html',
  styleUrls: ['./app-data-picker.component.scss'],
})
export class AppDataPickerComponent implements OnChanges {
  @Input() label = 'Date';
  @Input() placeholder = 'placeholder';
  @Input() startDate: Date | number | null = null;
  @Input() endDate: Date | number | null = null;
  @Input() isDisabled = false;

  disabledDate!: (d: Date) => boolean;
  control = new FormControl();
  customError: ErrorMessages = { required: 'It is necessary to input the date' };

  private destroy$ = new Subject<void>();
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const startDate = changes['startDate']?.currentValue;

    if (startDate) {
      this.disabledDate = (current: Date): boolean => differenceInCalendarDays(current, startDate) < 0;
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
