import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { AbilityService } from 'src/app/shared/services/ability.service';

@Component({
  selector: 'app-ability-modal',
  templateUrl: './ability-modal.component.html',
  styleUrls: ['./ability-modal.component.scss'],
})
export class AbilityModalComponent implements OnInit, OnDestroy {
  @Output() abilityAdded = new EventEmitter<Ability>();
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() type = '';
  ability!: Ability;
  form!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(private abilityService: AbilityService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  onAbilityFormSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.abilityService
      .addItem(this.type, { data: this.form.getRawValue() })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset();
        this.message.create('success', 'New ability was created successfully!');
      });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit();
  }

  addAbility(ability: Ability) {
    this.abilityAdded.emit(ability);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
