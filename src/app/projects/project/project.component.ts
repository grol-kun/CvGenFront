import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, combineLatest, finalize, of } from 'rxjs';
import { Project } from 'src/app/shared/models/interfaces/project';
import { Skill } from 'src/app/shared/models/interfaces/skill';
import { Response } from 'src/app/shared/models/interfaces/response';
import { AbilityService } from 'src/app/shared/services/ability.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit, OnDestroy {
  project!: Project;
  form!: FormGroup;
  skills: Skill[] = [];
  options: string[] = [];
  isDisabledDate = true;
  startDate: Date | number | null = null;

  private isNew = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private abilityService: AbilityService,
    private router: Router,
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    if (!this.form) {
      this.initForm();
    }
    this.initData();
    this.subscribeOnFormChanges();
  }

  subscribeOnFormChanges() {
    this.form
      .get('dateGroup')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data?.from) {
          this.undisableEndDate();
          this.startDate = new Date(data.from);
        } else {
          this.handleDisable();
        }

        const errors = this.form.get('dateGroup')?.errors;
        if (errors) {
          if (errors && Object.keys(errors)[0] === 'dates') {
            this.handleDisable();
          }
        }
      });
  }

  handleDisable() {
    this.disableEndDate();
    this.form.patchValue({ dateGroup: { from: null, to: null } }, { emitEvent: false });
  }

  private initForm(): void {
    this.form = this.fb.group({
      internalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dateGroup: this.fb.group(
        {
          from: ['', [Validators.required]],
          to: ['', [Validators.required]],
        },
        { validator: DateValidator }
      ),
      skills: [[], [Validators.required]],
      domain: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required]],
    });
  }

  initData() {
    combineLatest([
      this.route.params.pipe(
        switchMap(({ id }) => {
          if (id !== 'new') {
            return this.projectService.getProjectById(id);
          }
          this.isNew = true;
          return of(null);
        }),
        takeUntil(this.destroy$)
      ),
      this.abilityService.getFullList<Response<Skill>>('skills'),
    ]).subscribe(([projectsResponse, skillsResponse]) => {
      if (projectsResponse) {
        this.project = projectsResponse.data;
        const { internalName, name, from, to, domain, description, skills } = projectsResponse.data.attributes;

        this.skills = skillsResponse.data;
        const skillsNames = skills.map((skill) => skill.attributes.name);

        this.form.patchValue(
          { internalName, name, dateGroup: { from, to }, domain, description, skills: skillsNames },
          { emitEvent: false }
        );

        if (from) {
          this.undisableEndDate();
        }
      }

      if (this.skills.length === 0) {
        this.skills = skillsResponse.data;
      }

      this.options = this.skills.map((item: Skill) => item.attributes.name);
    });
  }

  undisableEndDate() {
    this.isDisabledDate = false;
  }

  disableEndDate() {
    this.isDisabledDate = true;
  }

  onAuthSubmit() {
    const requestBody = this.projectService.makeRequestBody(this.form, this.skills);
    this.form.disable();

    const request$ = this.isNew
      ? this.projectService.addNewProject(requestBody)
      : this.projectService.updateProject(this.project.id, requestBody);

    if (request$) {
      request$
        .pipe(
          finalize(() => this.form.enable()),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const text = this.isNew
            ? this.translateService.instant('message_box.success_project_new')
            : this.translateService.instant('message_box.success_project_update', {
                project: this.project.attributes.name,
              });

          this.message.create('success', text);
        });
    }
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
