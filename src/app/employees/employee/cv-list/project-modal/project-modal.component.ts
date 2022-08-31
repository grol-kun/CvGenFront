import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { PROJECT_COLUMNS } from 'src/app/shared/models/constants/project-columns';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Project } from 'src/app/shared/models/interfaces/project';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  projectSelected = new EventEmitter<Project>();
  @Output()
  hideModals = new EventEmitter<boolean>();
  @Input() isVisible = false;

  projectList$!: Observable<Project[]>;
  listOfColumns: ColumnItem[] = PROJECT_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible: boolean = changes?.['isVisible']?.currentValue;

    if (isVisible) {
      this.isVisible = isVisible;
    }
  }

  ngOnInit(): void {
    this.projectList$ = this.projectService.getProjects().pipe(
      takeUntil(this.destroy$),
      map((data) => data.data)
    );
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModals.emit();
  }

  selectProject(project: Project) {
    this.projectSelected.emit(project);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
