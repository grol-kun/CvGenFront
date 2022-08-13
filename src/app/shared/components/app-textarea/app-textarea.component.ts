import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-textarea',
  templateUrl: './app-textarea.component.html',
  styleUrls: ['./app-textarea.component.scss'],
})
export class AppTextareaComponent implements ControlValueAccessor, OnInit {
  @Input() public label: string = 'Textarea';
  @Input() public placeholder: string = 'placeholder';
  @Input() public minRows = 3;
  @Input() public maxRows = 6;
  public rowsSize!: { minRows: number, maxRows: number };
  private destroy$ = new Subject<void>();
  public control = new FormControl();
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
      })
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
