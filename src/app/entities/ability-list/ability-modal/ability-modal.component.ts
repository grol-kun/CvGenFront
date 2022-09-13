import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { Response } from 'src/app/shared/models/interfaces/response';
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
  ability!: Ability;
  form!: FormGroup;
  abilityList!: Ability[];

  private destroy$ = new Subject<void>();

  constructor(private abilityService: AbilityService, private fb: FormBuilder, private message: NzMessageService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.abilityService
      .getFullList<Response<Ability>>(this.type)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.abilityList = data.data;
      });
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
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
