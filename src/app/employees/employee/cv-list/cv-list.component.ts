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
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize, takeUntil, Observable, debounceTime } from 'rxjs';
import { updateMyInfo } from 'src/app/core/store/actions/auth.actions';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { Project } from 'src/app/shared/models/interfaces/project';
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
    private store: Store,
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
          this.messageService.create('success', this.translateService.instant('message_box.success_user_update'));
        }
        this.store.dispatch(updateMyInfo());
      });
  }

  getNewUser(newCvs: Cv[]): UserInfo | null {
    const { firstName, lastName, education, skills, languages, description } = this.form.getRawValue();
    if (this.user?.id) {
      return {
        ...this.user,
        firstName,
        lastName,
        education,
        skills,
        languages,
        description,
        cvs: newCvs,
      };
    }
    return null;
  }

  getNewCvs(currentCv: Cv): Cv[] {
    const cvs = [...this.cvs];
    if (this?.currentCv?.id) {
      return cvs.map((cv) => (cv.id === this.currentCv!.id ? currentCv : cv));
    }
    return cvs;
  }

  getNewCurrentCv(): Cv {
    const currentCv = { ...this.currentCv };

    if (this.form.get('projects')?.value) {
      const projects = this.form.get('projects')!.value;

      if (currentCv?.attributes?.projects) {
        if (projects.length > 0) {
          currentCv.attributes.projects.data = [...projects];
        } else {
          currentCv.attributes.projects = null;
        }
      }
    }

    return currentCv;
  }

  activateForm(cv: Cv) {
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

    if (this.currentCv && this.currentCv.attributes.projects) {
      this.currentCv.attributes.projects.data.push(project);
    } else if (this.currentCv) {
      this.currentCv.attributes.projects = { data: [project] };
    }

    this.patchProjects();
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
