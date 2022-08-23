import { Component, forwardRef, Input, OnDestroy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { GRADATION } from '../../models/constants/gradation';
import { Ability } from '../../models/interfaces/ability';
import { Response } from '../../models/interfaces/response';
import { Language } from '../../models/interfaces/language';
import { Skill } from '../../models/interfaces/skill';
import { DropdownResultOptions } from '../../models/interfaces/name-level-dropdown-resp';

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
  @Input() fullListResponse!: Response<Language | Skill> | null;

  options!: NzCascaderOption[];
  optionsLevel = GRADATION;
  form!: FormGroup;
  fullList!: Ability[];
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fullListResponse = changes?.['fullListResponse']?.currentValue;
    if (fullListResponse) {
      this.fullList = fullListResponse.data;
      this.options = fullListResponse.data.map((item: Ability) => {
        return { value: item.id, label: item.attributes.name, isLeaf: true };
      });
    }
  }

  public writeValue(val: any): void {
    if (val) {
      const { name, level } = val.attributes;
      this.form.setValue({ name, level }, { emitEvent: false });
    }
  }

  public onTouched: () => void = () => {};

  public registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value: DropdownResultOptions) => {
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
          return null;
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
