import { Component, EventEmitter, Input, OnInit, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { AbilityService } from 'src/app/shared/services/ability.service';

@Component({
  selector: 'app-edit-ability-modal',
  templateUrl: './edit-ability-modal.component.html',
  styleUrls: ['./edit-ability-modal.component.scss'],
})
export class EditAbilityModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() id = 0;
  @Input() data = '';
  @Input() type = '';
  @Input() abilitiesList: Ability[] | null = null;

  ability!: Ability;
  form!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private abilityService: AbilityService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.data, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  ngOnChanges() {
    if (this.data) {
      const name = this.data;
      this.form.patchValue({ name }, { emitEvent: false });
    }
  }

  onAbilityFormSubmit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    if (
      this.abilitiesList?.some((e) => e.attributes.name.toLowerCase() === this.form.getRawValue().name.toLowerCase())
    ) {
      this.form.reset();
      this.message.create('error', this.translateService.instant('message_box.error_ability_exists'));
      return;
    }

    this.abilityService
      .updateItemById(this.id, this.type, { data: this.form.getRawValue() })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset();
        this.message.create('success', this.translateService.instant('message_box.success_ability_update'));
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
