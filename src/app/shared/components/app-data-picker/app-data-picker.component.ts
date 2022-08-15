import { Component, Input, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-app-data-picker',
  templateUrl: './app-data-picker.component.html',
  styleUrls: ['./app-data-picker.component.scss']
})
export class AppDataPickerComponent {
  @Input() label = 'Date';
  @Input() placeholder = 'placeholder';
  control = new FormControl();
  customError = { required: 'It is necessary to input the date' };
  private destroy$ = new Subject<void>();
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(
    @Self() public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  ngOnInit(): void {
    this.control!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
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
