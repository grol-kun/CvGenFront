import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, takeUntil, Subject, debounceTime } from 'rxjs';
import { PROJECT_COLUMNS } from '../shared/models/constants/project-columns';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { Project } from '../shared/models/interfaces/project';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectList$!: Observable<Project[]>;
  searchField = '';
  searchValue = '';
  searchControl = new FormControl<string>('');
  listOfColumns: ColumnItem[] = PROJECT_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProjectList();
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchValue = data ?? '';
      this.cdr.detectChanges();
    });
  }

  getProjectList() {
    this.projectList$ = this.projectService.getProjects().pipe(map((data) => data.data));
  }

  onFilterTrigger(searchField: string) {
    if (this.searchField !== searchField) {
      this.searchValue = '';
    }
    this.searchField = searchField;
  }

  deleteItem(id: number) {
    this.projectService
      .deleteProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.message.create('success', `Project has just been deleted!`);
        this.getProjectList();
        this.cdr.detectChanges();
      });
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
