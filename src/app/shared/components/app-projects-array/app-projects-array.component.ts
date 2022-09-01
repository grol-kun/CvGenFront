import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
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
  Validators,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Response } from '../../models/interfaces/response';
import { Project } from '../../models/interfaces/project';
import { Skill } from '../../models/interfaces/skill';
import { AbilityService } from '../../services/ability.service';

@Component({
  selector: 'app-projects-array',
  templateUrl: './app-projects-array.component.html',
  styleUrls: ['./app-projects-array.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppProjectsArrayComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppProjectsArrayComponent),
      multi: true,
    },
  ],
})
export class AppProjectsArrayComponent implements ControlValueAccessor, OnInit, OnDestroy {
  form!: FormGroup;
  fullListResponse: Response<Skill> | null = null;
  private destroy$ = new Subject<void>();
  projects: Project[] = [];

  constructor(private fb: FormBuilder, private abilityService: AbilityService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });

    this.abilityService
      .getFullList<Response<Skill>>('skills')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.fullListResponse = data;
      });
  }

  public get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
    this.projects.splice(index, 1);
  }

  catchClick(event: Event) {
    event.stopPropagation();
  }

  addItem() {
    this.items.push(new FormControl('', [Validators.required]));
  }

  public writeValue(value: any[]): void {
    this.items.clear();
    if (value) {
      this.projects = value;
      value.forEach((item) => this.items.push(new FormControl(item, [Validators.required])));
    }
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
