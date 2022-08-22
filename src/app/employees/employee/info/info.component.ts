import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      this.form.controls['firstName'].setValue(user.firstName);
      this.form.controls['lastName'].setValue(user.lastName);
      this.form.controls['education'].setValue(user.education);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['skills'].setValue(user.skills);
      this.form.controls['languages'].setValue(user.languages);
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
    const { firstName, lastName, education, email, skills, languages } = this.form.getRawValue();
    if (!this.user) return;
    const user: UserInfo = { ...this.user, firstName, lastName, education, email, skills, languages };

    if (user.id) {
      this.form.disable();
      this.userService
        .updateUser(user.id, user)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.form.enable())
        )
        .subscribe({
          next: () => {
            this.message.create('success', `User ${user.firstName} was updated successfully!`);
          },
          error: (err) => {
            console.error(err);
            this.message.create('error', `Authorization error! Status:${err.message}`);
          },
        });
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
