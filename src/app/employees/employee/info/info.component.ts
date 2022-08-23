import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, Subject, takeUntil } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() user!: UserInfo | null;

  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.form) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user = changes?.['user']?.currentValue;

    if (user) {
      const { firstName, lastName, education, email, skills, languages } = user;
      this.form.patchValue({ firstName, lastName, education, email, skills, languages }, { emitEvent: false });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      education: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      skills: [],
      languages: [],
    });
  }

  onAuthSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid || !this.user) {
      return;
    }
    const user: UserInfo = { ...this.user, ...this.form.getRawValue() };

    if (user.id) {
      this.form.disable();
      this.userService
        .updateUser(user.id, user)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.form.enable())
        )
        .subscribe(() => this.message.create('success', `User ${user.firstName} was updated successfully!`));
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
