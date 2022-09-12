import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Response } from '../../models/interfaces/response';
import { Language } from '../../models/interfaces/language';
import { Skill } from '../../models/interfaces/skill';
import { Ability } from '../../models/types/ability';
import { AbilityService } from '../../services/ability.service';

@Component({
  selector: 'app-form-array-block',
  templateUrl: './form-array-block.component.html',
  styleUrls: ['./form-array-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormArrayBlockComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormArrayBlockComponent),
      multi: true,
    },
  ],
})
export class FormArrayBlockComponent implements ControlValueAccessor, OnInit, Validator, OnDestroy {
  @Input() datatype!: Ability;

  form!: FormGroup;
  fullListResponse!: Response<Language | Skill>;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private abilityService: AbilityService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });

    this.abilityService
      .getFullList<Response<Language | Skill>>(this.datatype)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.fullListResponse = data;
        this.cdr.detectChanges();
      });
  }

  public get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
  }

  addItem() {
    this.items.push(new FormControl('', [Validators.required]));
  }

  public writeValue(value: any[]): void {
    this.items.reset();
    if (value) {
      value.forEach((item) => this.items.push(new FormControl(item, [Validators.required])));
    }
    this.cdr.detectChanges();
  }

  public onTouched: () => void = () => {};

  public registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        map((value) => value.items),
        takeUntil(this.destroy$)
      )
      .subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: { valid: false, message: 'FormArrayComponent invalid' } };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
