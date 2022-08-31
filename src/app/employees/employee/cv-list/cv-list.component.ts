import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { Project } from 'src/app/shared/models/interfaces/project';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
})
export class CvListComponent implements OnInit {
  @Input() user: UserInfo | null = null;

  form!: FormGroup;
  cvs: Cv[] = [];
  searchCv = '';
  isCvModalVisible = false;
  isProjectModalVisible = false;
  isFormVisible = false;

  private currentCv: Cv | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private userService: UserService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    if (!this.form) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user: UserInfo = changes?.['user']?.currentValue;

    if (user) {
      console.log('user: ', user);

      const { firstName, lastName, education, skills, languages, description } = user;
      this.cvs = user.cvs;
      this.form.patchValue({ firstName, lastName, education, description, skills, languages }, { emitEvent: false });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      education: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      skills: [],
      languages: [],
      projects: [],
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

  searchChange(value: string) {
    this.searchCv = value;
  }

  trackByFn(index: number, cv: Cv) {
    return cv.id;
  }

  activateForm(cv: Cv) {
    console.log('cv:', cv);
    if (!cv.attributes.projects) {
      cv.attributes.projects = { data: [] };
    }
    this.currentCv = cv;
    this.patchProjects();
    this.isFormVisible = true;
  }

  patchProjects() {
    if (this.currentCv && this.currentCv.attributes.projects) {
      const { data: projects } = this.currentCv.attributes.projects;
      console.log('projects: ', projects);

      this.form.patchValue({ projects }, { emitEvent: false });
    }
  }

  onCvSelected(cv: Cv) {
    const existIds = this.cvs.map((cv) => cv.id);
    if (!existIds.includes(cv.id)) {
      this.cvs.push(cv);
    }
    console.log('cvs : ', this.cvs);

    this.isCvModalVisible = false;
  }

  addProject() {
    this.isProjectModalVisible = true;
  }

  onProjectSelected(project: Project) {
    console.log('onProjectSelected', project);
    this.isProjectModalVisible = false;

    this.currentCv?.attributes.projects?.data.push(project);
    this.patchProjects();
  }

  showModal() {
    this.isCvModalVisible = true;
  }

  onHideModals() {
    this.isCvModalVisible = this.isProjectModalVisible = false;
  }

  deleteCv(idx: number) {
    if (this.cvs[idx] !== this.currentCv) {
      this.cvs.splice(idx, 1);
    } else {
      this.message.create('error', `You can't delete current CV!`);
    }
  }

  catchClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
