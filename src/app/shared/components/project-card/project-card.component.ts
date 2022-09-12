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
import { Project } from '../../models/interfaces/project';
import { Response } from '../../models/interfaces/response';
import { Responsibility } from '../../models/interfaces/responsibility';
import { Skill } from '../../models/interfaces/skill';
import { DateValidator } from '../../validators/date.validator';

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
  @Input() skillListResponse: Response<Skill> | null = null;
  @Input() respListResponse: Response<Responsibility> | null = null;

  isDisabledDate = true;
  startDate: Date | number | null = null;
  skillOptions: string[] = [];
  respOptions: string[] = [];
  form!: FormGroup;
  fullSkillList: Skill[] = [];
  fullRespList: Responsibility[] = [];

  private currentProject: Project | null = null;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeOnFormChanges();
  }

  subscribeOnFormChanges() {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data.dateGroup.from) {
        this.undisableEndDate();
        this.startDate = new Date(data.dateGroup.from);
      } else {
        this.handleDisable();
      }

      const errors = this.form.get('dateGroup')?.errors;
      if (errors) {
        if (errors && Object.keys(errors)[0] === 'dates') {
          this.handleDisable();
        }
      }
    });
  }

  handleDisable() {
    this.disableEndDate();
    this.form.patchValue({ dateGroup: { from: null, to: null } }, { emitEvent: false });
  }

  undisableEndDate() {
    this.isDisabledDate = false;
  }

  disableEndDate() {
    this.isDisabledDate = true;
  }

  initForm() {
    this.form = this.fb.group({
      internalName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dateGroup: this.fb.group(
        {
          from: ['', [Validators.required]],
          to: ['', [Validators.required]],
        },
        { validator: DateValidator }
      ),
      domain: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      description: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const skillListResponse = changes?.['skillListResponse']?.currentValue;
    const respListResponse = changes?.['respListResponse']?.currentValue;

    if (skillListResponse) {
      this.fullSkillList = skillListResponse.data;
      this.skillOptions = skillListResponse.data.map((item: Skill) => item.attributes.name);
    }

    if (respListResponse) {
      this.fullRespList = respListResponse.data;
      this.respOptions = respListResponse.data.map((item: Responsibility) => item.attributes.name);
    }
  }

  public writeValue(val: Project): void {
    if (val) {
      this.currentProject = val;
      const skillsNames = this.getSkillsNames(val);
      const respNames = this.getRespNames(val);
      this.setFormValue(val, skillsNames, respNames);
    }
  }

  private setFormValue(val: Project, skillsNames: string[], respNames: string[]): void {
    const { internalName, name, from, to, domain, description } = val.attributes;
    this.form.setValue(
      {
        internalName,
        name,
        dateGroup: { from, to },
        domain,
        skills: skillsNames,
        description,
        responsibilities: respNames,
      },
      { emitEvent: false }
    );

    if (from) {
      this.undisableEndDate();
    }
  }

  getRespNames(val: Project): string[] {
    return val.attributes.responsibilities
      ? val.attributes.responsibilities.data.map((resp: Responsibility) => resp.attributes.name)
      : [];
  }

  getSkillsNames(val: Project): string[] {
    const { skills } = val.attributes;
    return skills.map((skill: Skill) => skill.attributes.name);
  }

  public onTouched: () => void = () => {};

  public registerOnChange(fn: any): void {
    this.form.valueChanges
      .pipe(
        map((value) => {
          const objSkills = this.formSkills(value);
          const objResps = this.formResps(value);
          const formatedValue = this.formateValue(value);

          return this.getProjectBody(objSkills, objResps, formatedValue);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(fn);
  }

  formateValue(value: any) {
    const { dateGroup, description, domain, internalName, name } = value;
    return { description, domain, internalName, name, from: dateGroup.from, to: dateGroup.to };
  }

  getProjectBody(objSkills: Skill[], objResps: Responsibility[], value: any): Project | null {
    if (this.currentProject) {
      return {
        id: this.currentProject.id,
        attributes: {
          ...this.currentProject?.attributes,
          ...value,
          skills: [...objSkills],
          responsibilities: { data: [...objResps] },
        },
      };
    }
    return this.currentProject;
  }

  formResps(value: any) {
    return value.responsibilities.map((respName: string) =>
      this.fullRespList.find((resp) => resp.attributes.name === respName)
    );
  }

  formSkills(value: any): Skill[] {
    return value.skills.map((skillName: string) =>
      this.fullSkillList.find((skill) => skill.attributes.name === skillName)
    );
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
