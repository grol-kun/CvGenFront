import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize, takeUntil, Observable, debounceTime } from 'rxjs';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { CvAttributes } from 'src/app/shared/models/interfaces/cv-attributes';
import { CvUser } from 'src/app/shared/models/interfaces/cv-user';
import { Language } from 'src/app/shared/models/interfaces/language';
import { Project } from 'src/app/shared/models/interfaces/project';
import { Skill } from 'src/app/shared/models/interfaces/skill';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() user: UserInfo | null = null;

  form!: FormGroup;
  searchControl = new FormControl<string>('');
  cvs: Cv[] = [];
  searchCv = '';
  isCvModalVisible = false;
  isProjectModalVisible = false;
  isPreviewModalVisible = false;
  isFormVisible = false;

  private currentCv!: Cv;
  private destroy$ = new Subject<void>();

  cvs$!: Observable<Cv[]>;

  previewCv!: Cv;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: NzMessageService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.form) {
      this.initForm();
    }

    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchCv = data ?? '';
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const user: UserInfo = changes?.['user']?.currentValue;

    if (user) {
      const { firstName, lastName, education, skills, languages, description } = user;
      this.fillCvs(user);
      this.form.patchValue({ firstName, lastName, education, skills, languages, description }, { emitEvent: false });
    }
  }

  fillCvs(user: UserInfo) {
    if (user.cvs) {
      this.cvs = [...user.cvs];
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

  onAuthSubmit(isFormCalled: boolean) {
    const currentCv = this.getNewCurrentCv();
    const newCvs = this.getNewCvs(currentCv);
    const user = this.getNewUser(newCvs);

    this.previewCv = currentCv;

    if (!user) {
      return;
    }

    this.form.disable();
    this.userService
      .updateUser(user.id, user)
      .pipe(
        finalize(() => this.form.enable()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (isFormCalled) {
          this.messageService.create(
            'success',
            this.translateService.instant('message_box.success_user_update', { firstName: user.firstName })
          );
        }
      });
  }

  getNewUser(newCvs: Cv[]): UserInfo | null {
    if (this.user?.id) {
      return {
        ...this.user,
        cvs: newCvs,
      };
    }
    return null;
  }

  getNewCvs(currentCv: Cv): Cv[] {
    const cvs = [...this.cvs];
    if (this.currentCv?.id) {
      return cvs.map((cv) => (cv.id === this.currentCv!.id ? currentCv : cv));
    }
    return cvs;
  }

  getNewCurrentCv(): Cv {
    const currentCv = { ...this.currentCv };

    const projects: Project[] = this.form.get('projects')?.value;
    currentCv.attributes.projects.data = projects?.length ? [...projects] : null;

    const skills: Skill[] = this.form.get('skills')?.value;
    currentCv.attributes.skills = skills ? skills : [];

    const languages: Language[] = this.form.get('languages')?.value;
    currentCv.attributes.languages = languages ? languages : [];

    const { description, education, firstName, lastName } = this.form.getRawValue();
    const cvUser: CvUser = { description, education, firstName, lastName };
    currentCv.attributes.user = cvUser;

    return currentCv;
  }

  activateForm(cv: Cv) {
    if (!cv.attributes.projects) {
      cv.attributes.projects = { data: [] };
    }
    this.currentCv = cv;

    const attributes = this.currentCv.attributes;
    this.patchProjects(attributes);
    this.patchUserInfo(attributes);
    this.patchSkills(attributes);
    this.patchLanguages(attributes);

    this.isFormVisible = true;
  }

  patchLanguages(attributes: CvAttributes) {
    if (attributes.languages) {
      this.form.patchValue({ languages: attributes.languages }, { emitEvent: false });
    }
  }

  patchSkills(attributes: CvAttributes) {
    if (attributes.skills) {
      this.form.patchValue({ skills: attributes.skills }, { emitEvent: false });
    }
  }

  patchUserInfo(attributes: CvAttributes) {
    const source = attributes.user ? attributes.user : this.user;
    const { firstName, lastName, education, description } = source!;
    this.form.patchValue({ firstName, lastName, education, description }, { emitEvent: false });
  }

  patchProjects(attributes: CvAttributes) {
    if (attributes.projects) {
      const { data: projects } = attributes.projects;
      this.form.patchValue({ projects }, { emitEvent: false });
    }
  }

  showCvModal() {
    this.isCvModalVisible = true;
  }

  onCvSelected(cv: Cv) {
    this.cvs.push(cv);
    this.isCvModalVisible = false;
  }

  showProjectModal() {
    this.isProjectModalVisible = true;
  }

  showPreviewModal() {
    this.onAuthSubmit(false);
    this.isPreviewModalVisible = true;
  }

  onProjectSelected(project: Project) {
    this.isProjectModalVisible = false;
    const attributes = this.currentCv.attributes;

    if (attributes.projects.data) {
      attributes.projects.data.push(project);
    } else if (this.currentCv) {
      attributes.projects = { data: [project] };
    }

    this.patchProjects(attributes);
  }

  onHideModals() {
    this.isCvModalVisible = false;
    this.isProjectModalVisible = false;
    this.isPreviewModalVisible = false;
  }

  deleteCv(idx: number) {
    if (this.cvs[idx] !== this.currentCv) {
      this.cvs.splice(idx, 1);
    } else {
      this.messageService.create('error', `You can't delete current CV!`);
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  trackByFn(index: number, cv: Cv) {
    return cv.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
