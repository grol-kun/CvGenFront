import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap, combineLatest, finalize, of } from 'rxjs';
import { Project } from 'src/app/shared/models/interfaces/project';
import { Skill } from 'src/app/shared/models/interfaces/skill';
import { Response } from 'src/app/shared/models/interfaces/response';
import { AbilityService } from 'src/app/shared/services/ability.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  project!: Project;
  form!: FormGroup;
  skills: Skill[] = [];
  options: string[] = [];

  private isNew = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private abilityService: AbilityService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    if (!this.form) {
      this.initForm();
    }

    combineLatest([
      this.route.params.pipe(
        takeUntil(this.destroy$),
        switchMap(({ id }) => {
          if (id !== 'new') {
            return this.projectService.getProjectById(id);
          }
          this.isNew = true;
          return of(null);
        })
      ),
      this.abilityService.getFullList<Response<Skill>>('skills'),
    ]).subscribe(([projectsResponse, skillsResponse]) => {
      if (projectsResponse) {
        this.project = projectsResponse.data;
        const { internalName, name, from, to, domain, description, skills } = projectsResponse.data.attributes;

        this.skills = skillsResponse.data;
        const skillsNames = skills.map((skill) => skill.attributes.name);

        this.form.patchValue(
          { internalName, name, from, to, domain, description, skills: skillsNames },
          { emitEvent: false }
        );
      }

      if (this.skills.length === 0) {
        this.skills = skillsResponse.data;
      }

      this.options = this.skills.map((item: Skill) => item.attributes.name);
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      internalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      skills: [[], [Validators.required]],
      domain: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required]],
    });
  }

  onAuthSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const requestBody = this.projectService.makeRequestBody(this.form, this.skills);
    this.form.disable();

    const request$ = this.isNew
      ? this.projectService.addNewProject(requestBody)
      : this.projectService.updateProject(this.project.id, requestBody);

    if (request$) {
      request$
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.form.enable())
        )
        .subscribe(() => {
          const text = this.isNew
            ? `New project was created successfully!`
            : `Project "${this.project.attributes.name}" was updated successfully!`;

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
