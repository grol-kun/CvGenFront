import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, takeUntil, Subject, BehaviorSubject, switchMap } from 'rxjs';
import { PROJECT_COLUMNS } from '../shared/models/constants/project-columns';
import { DataTypeEnum } from '../shared/models/emuns/data-type.enum';
import { Project } from '../shared/models/interfaces/project';
import { Entity } from '../shared/models/types/entity';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectList$ = new BehaviorSubject<Project[]>([]);
  PROJECT_COLUMNS = PROJECT_COLUMNS;
  dataTypeEnum = DataTypeEnum;

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private message: NzMessageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProjectList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.projectList$.next(data));
  }

  getProjectList() {
    return this.projectService.getProjects().pipe(map((data) => data.data));
  }

  deleteItem(id: number) {
    this.projectService
      .deleteProjectById(id)
      .pipe(
        switchMap(() => this.getProjectList()),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.projectList$.next(data);
        this.message.create('success', this.translateService.instant('message_box.success_delete'));
      });
  }

  redirect(data: Entity) {
    this.router.navigate([`/${this.dataTypeEnum.projects}/`, data.id]);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
