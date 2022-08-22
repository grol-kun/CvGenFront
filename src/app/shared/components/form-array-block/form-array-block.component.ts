import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
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
import { map } from 'rxjs';
import { LanguageResponse } from '../../models/interfaces/language-response';
import { SkillResponse } from '../../models/interfaces/skill-response';
import { LanguageService } from '../../services/language.service';
import { SkillService } from '../../services/skill.service';

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
export class FormArrayBlockComponent implements ControlValueAccessor, OnInit, Validator {
  @Input() datatype?: string;

  public form!: FormGroup;
  private currentService!: SkillService | LanguageService;
  public fullListResponse!: SkillResponse | LanguageResponse;

  constructor(
    private fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private skillService: SkillService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    switch (this.datatype) {
      case 'skills':
        this.currentService = this.skillService;
        break;
      case 'languages':
        this.currentService = this.languageService;
        break;
    }

    this.form = this.fb.group({
      items: this.fb.array([]),
    });

    this.currentService.getFullList().subscribe((data) => (this.fullListResponse = data));
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
    this.form.valueChanges.pipe(map((value) => value.items)).subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: { valid: false, message: 'FormArrayComponent invalid' } };
  }
}
