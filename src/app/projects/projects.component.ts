import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, takeUntil, Subject } from 'rxjs';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { Project } from '../shared/models/interfaces/project';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectList$!: Observable<Project[]>;
  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService, private message: NzMessageService) {}

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    this.projectList$ = this.projectService.getProjects().pipe(map((data) => data.data));
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Project, b: Project) => a.attributes.name.localeCompare(b.attributes.name),
    },
    {
      name: 'Start Date',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Project, b: Project) => a.attributes.from.localeCompare(b.attributes.from),
    },
    {
      name: 'End Date',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Project, b: Project) => a.attributes.to.localeCompare(b.attributes.to),
    },
  ];

  deleteItem(event: Event, id: number) {
    event.stopPropagation();
    this.projectService
      .deleteProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.message.create('success', `Project has just been deleted!`);
        this.getProjectList();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
