import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PROJECT_COLUMNS } from 'src/app/shared/models/constants/project-columns';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Project } from 'src/app/shared/models/interfaces/project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent implements OnInit {
  @Output()
  projectSelected = new EventEmitter<Project>();
  @Output()
  hideModals = new EventEmitter<boolean>();
  @Input() isVisible = false;

  projectList$!: Observable<Project[]>;
  listOfColumns: ColumnItem[] = PROJECT_COLUMNS;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectList$ = this.projectService.getProjects().pipe(map((data) => data.data));
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModals.emit();
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }
}
