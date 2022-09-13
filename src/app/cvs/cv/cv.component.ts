import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, Subject, takeUntil, switchMap, of, filter, map } from 'rxjs';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { Project } from 'src/app/shared/models/interfaces/project';
import { CvService } from 'src/app/shared/services/cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit, OnDestroy {
  cv!: Cv;
  form!: FormGroup;
  isProjectModalVisible = false;

  private destroy$ = new Subject<void>();
  private isNew = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private cvService: CvService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.form) {
      this.initForm();
    }

    this.initData();
  }

  onProjectSelected(project: Project) {
    this.isProjectModalVisible = false;
    this.patchProjects(project);
  }

  patchProjects(project: Project) {
    const formValue = this.form.get('projects')?.getRawValue();
    const projects = [...(formValue ?? []), project];
    this.form.patchValue({ projects }, { emitEvent: false });
  }

  showProjectModal() {
    this.isProjectModalVisible = true;
  }

  onHideModals() {
    this.isProjectModalVisible = false;
  }

  private initData(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          if (id !== 'new') {
            return this.cvService.getCvById(id);
          }
          this.isNew = true;
          return of(null);
        }),
        filter((data) => !!data),
        map((data) => data?.data ?? null),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.cv = data!;
        const projects = this.cv.attributes.projects?.data ?? [];
        this.form.patchValue({ ...this.cv.attributes, projects }, { emitEvent: false });
      });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      skills: [],
      languages: [],
      projects: [],
    });
  }

  onAuthSubmit() {
    const requestBody = this.formBody();

    const request$ = this.isNew
      ? this.cvService.addNewCv(requestBody)
      : this.cvService.updateCv(this.cv.id, requestBody);

    if (request$) {
      request$
        .pipe(
          finalize(() => this.form.enable()),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const text = this.isNew
            ? `New CV was created successfully!`
            : `CV "${this.cv.attributes.name}" was updated successfully!`;

          this.message.create('success', text);
        });
    }
  }

  formBody() {
    const {
      name = '',
      description = '',
      skills = null,
      languages = null,
      projects = null,
    } = { ...this.form.getRawValue() };

    const data = { name, description, skills, languages, projects: { data: projects } };

    return this.isNew ? { data } : { data: { ...this.cv.attributes, ...data } };
  }

  onCancel() {
    this.router.navigate(['/cvs']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
