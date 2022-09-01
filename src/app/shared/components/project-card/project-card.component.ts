import { Component, forwardRef, Input, OnDestroy, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  ControlValueAccessor,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../../models/interfaces/response';
import { Skill } from '../../models/interfaces/skill';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectCardComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProjectCardComponent),
      multi: true,
    },
  ],
})
export class ProjectCardComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() fullListResponse: Response<Skill> | null = null;

  options: string[] = [];
  form!: FormGroup;
  fullList: Skill[] = [];

  private currentSkill: Skill | undefined = undefined;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      internalName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fullListResponse = changes?.['fullListResponse']?.currentValue;
    if (fullListResponse) {
      this.fullList = fullListResponse.data;
      this.options = fullListResponse.data.map((item: Skill) => item.attributes.name);
    }
  }

  public writeValue(val: any): void {
    if (val) {
      this.currentSkill = val;

      const { internalName, name, from, to, domain, skills, description } = val.attributes;
      const skillsNames = skills.map((skill: Skill) => skill.attributes.name);

      this.form.setValue(
        { internalName, name, from, to, domain, skills: skillsNames, description },
        { emitEvent: false }
      );
    }
  }

  public onTouched: () => void = () => {};

  public registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        map((value) => {
          if (value.skills) {
            const objSkills = value.skills.map((skillName: string) =>
              this.fullList.find((skill) => skill.attributes.name === skillName)
            );

            return {
              id: this.currentSkill?.id,
              attributes: { ...this.currentSkill?.attributes, ...value, skills: [...objSkills] },
            };
          }
          return { ...value, skills: null };
        }),
        takeUntil(this.destroy$)
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
