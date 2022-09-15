import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { AbilityService } from 'src/app/shared/services/ability.service';

@Component({
  selector: 'app-ability-modal',
  templateUrl: './ability-modal.component.html',
  styleUrls: ['./ability-modal.component.scss'],
})
export class AbilityModalComponent implements OnInit, OnDestroy {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() type = '';
  @Input() abilitiesList$: BehaviorSubject<Ability[]> | null = null;

  ability!: Ability;
  form!: FormGroup;
  abilityList!: Ability[];

  private destroy$ = new Subject<void>();

  constructor(
    private abilityService: AbilityService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.makeAbilityList();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  makeAbilityList() {
    this.abilitiesList$
      ?.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.abilityList = data;
      });
  }

  onAbilityFormSubmit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    if (this.abilityList.some((e) => e.attributes.name.toLowerCase() === this.form.getRawValue().name.toLowerCase())) {
      this.form.reset();
      this.message.create('error', this.translateService.instant('message_box.error_ability_exists'));
      return;
    }

    this.abilityService
      .addItem(this.type, { data: this.form.getRawValue() })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset();
        this.message.create('success', this.translateService.instant('message_box.success_ability'));
      });
    this.handleCancel();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
