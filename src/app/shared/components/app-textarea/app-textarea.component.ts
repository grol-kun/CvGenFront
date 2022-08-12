import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './app-textarea.component.html',
  styleUrls: ['./app-textarea.component.scss'],
})
export class AppTextareaComponent implements ControlValueAccessor, OnInit {
  @Input() public label?= 'Input';
  @Input() public placeholder?= 'placeholder';
  @Input() public minRows = 3;
  @Input() public maxRows = 6;
  public rowsSize!: { minRows: number, maxRows: number };
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.rowsSize = { minRows: this.minRows, maxRows: this.maxRows };
  }

  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  writeValue(value: any): void {
    if (value) {
      this.ngControl.control?.setValue(value, { emitEvent: false });
    }
  }
}
