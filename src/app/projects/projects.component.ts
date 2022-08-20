import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { ProjectInfo } from '../shared/models/interfaces/project-info';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projectsList$!: Observable<ProjectInfo[]>;
  localePath = 'projects.actions.';

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectsList$ = this.projectService
      .getProjects()
      .pipe(map((data) => data.data));
  }

  listOfColumns: ColumnItem[] = [
    {
      name: this.localePath + 'name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ProjectInfo, b: ProjectInfo) =>
        a.attributes.name.localeCompare(b.attributes.name),
    },
    {
      name: this.localePath + 'from',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ProjectInfo, b: ProjectInfo) =>
        a.attributes.from.localeCompare(b.attributes.to),
    },
    {
      name: this.localePath + 'to',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: ProjectInfo, b: ProjectInfo) =>
        a.attributes.to.localeCompare(b.attributes.to),
    },
  ];
}
