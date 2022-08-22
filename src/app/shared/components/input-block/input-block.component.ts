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
  @Input() fullListResponse!: SkillResponse | LanguageResponse | null;

  options!: NzCascaderOption[];
  optionsLevel = gradation;
  public form!: FormGroup;
  private destroy$ = new Subject<void>();
  fullList!: Skill[] | Language[];

  constructor(public builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fullListResponse = changes?.['fullListResponse']?.currentValue;
    if (fullListResponse) {
      this.fullList = fullListResponse.data;
      this.options = fullListResponse.data.map((item: Language | Skill) => {
        return { value: item.id, label: item.attributes.name, isLeaf: true };
      });
    }
  }

  public writeValue(val: any): void {
    if (val) {
      this.form.controls['name'].setValue(val.attributes.name, { emitEvent: false });
      this.form.controls['level'].setValue(val.attributes.level, { emitEvent: false });
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
    return this.form.valid ? null : { invalidForm: { valid: false, message: 'SubFormComponent invalid' } };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
