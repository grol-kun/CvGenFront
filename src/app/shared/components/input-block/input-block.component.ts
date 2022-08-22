import { Component, forwardRef, Input, OnDestroy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { gradation } from '../../models/constants/gradation';
import { Language } from '../../models/interfaces/language';
import { LanguageResponse } from '../../models/interfaces/language-response';
import { Skill } from '../../models/interfaces/skill';
import { SkillResponse } from '../../models/interfaces/skill-response';

@Component({
  selector: 'app-input-block',
  templateUrl: './input-block.component.html',
  styleUrls: ['./input-block.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBlockComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputBlockComponent),
      multi: true,
    },
  ],
})
export class InputBlockComponent implements OnInit, OnDestroy, OnChanges {
  @Input() index?: number;
  @Input() fullListResponse!: SkillResponse | LanguageResponse | null;

  options!: NzCascaderOption[];
  optionsLevel = gradation;
  public form!: FormGroup;
  currentValue: any;
  private destroy$ = new Subject<void>();
  fullList!: Skill[] | Language[];

  constructor(public builder: FormBuilder) {
    console.log('SubFormComponent | constructor');
  }
  ngOnInit(): void {
    this.form = this.builder.group({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
    });
    this.form.markAllAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('SubFormComponent | ngOnChanges');

    if (this.fullListResponse) {
      this.fullList = this.fullListResponse.data;
      this.options = this.fullListResponse.data.map((item) => {
        return { value: item.id, label: item.attributes.name, isLeaf: true };
      });
    }
  }

  public writeValue(val: any): void {
    console.log('SubFormComponent | writeValue');
    if (val) {
      this.form.controls['name'].setValue(val.attributes.name, { emitEvent: false });
      this.form.controls['level'].setValue(val.attributes.level, { emitEvent: false });
      this.form.markAllAsTouched();
      console.log(this.form);
    }
  }

  public onTouched: () => void = () => {};

  public registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value: { name: string | number[]; level: string | number[] }) => {
          if (value.name) {
            const currentObj =
              typeof value.name === 'string'
                ? this.fullList.find((skill) => skill.attributes.name === value.name)
                : this.fullList.find((skill) => skill.id === value.name[0]);
            if (currentObj && value.level && value.name) {
              currentObj.attributes.level = typeof value.level === 'string' ? value.level : String(value.level[0]);
            }
            return currentObj;
          }
          return;
        })
      )
      .subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    console.log('SubFormComponent | validate | ' + this.form.valid);
    console.log(this.form);

    return this.form.valid ? null : { invalidForm: { valid: false, message: 'SubFormComponent invalid' } };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
