import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { validateLength } from '../../validators/length.validator';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateLength,
      multi: true
    }
  ]
})
export class AppInputComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() public label?: string = "Input";
  @Input() public placeholder?: string = "placeholder";

  public control = new FormControl('', [Validators.required, validateLength]);
  private onChange = (value: any) => { };
  private onTouched = () => { };
  registerOnChange = (fn: (value: any) => {}) => this.onChange = fn;
  registerOnTouched = (fn: () => {}) => this.onTouched = fn;

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(value);
      })
  }

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return control.errors;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
