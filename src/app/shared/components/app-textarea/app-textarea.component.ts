import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DEFAULT_MAX_ROWS_VALUE, DEFAULT_MIN_ROWS_VALUE } from '../../models/constants/constants';
import { RowsSize } from '../../models/interfaces/rowsSize';

@Component({
  selector: 'app-textarea',
  templateUrl: './app-textarea.component.html',
  styleUrls: ['./app-textarea.component.scss'],
})
export class AppTextareaComponent implements ControlValueAccessor, OnInit {
  @Input() label = 'Textarea';
  @Input() placeholder = 'placeholder';
  @Input() minRows = DEFAULT_MIN_ROWS_VALUE;
  @Input() maxRows = DEFAULT_MAX_ROWS_VALUE;
  rowsSize!: RowsSize;
  control = new FormControl();
  private destroy$ = new Subject<void>();
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.rowsSize = { minRows: this.minRows, maxRows: this.maxRows };
    this.control!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(value);
      });
  }

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
