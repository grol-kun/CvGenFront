import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, takeUntil, Subject, debounceTime } from 'rxjs';
import { PROJECT_COLUMNS } from '../shared/models/constants/project-columns';
import { SearchTypeEnum } from '../shared/models/emuns/search-type.enum';
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
  searchTypeEnum = SearchTypeEnum;
  projectList$!: Observable<Project[]>;
  searchField = '';
  searchData: string | Date[] = '';
  searchControl = new FormControl<string>('');
  searchDateContorl = new FormControl<Date[]>([]);
  listOfColumns: ColumnItem[] = PROJECT_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getProjectList();
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchData = data ?? '';
      this.cdr.markForCheck();
    });

    this.searchDateContorl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchData = data ?? [];
      this.cdr.markForCheck();
    });
  }

  getProjectList() {
    this.projectList$ = this.projectService.getProjects().pipe(map((data) => data.data));
  }

  onFilterTrigger(searchField: string) {
    if (this.searchField !== searchField) {
      this.searchData = '';
    }
    this.searchField = searchField;
  }

  deleteItem(id: number) {
    this.projectService
      .deleteProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.message.create('success', this.translateService.instant('message_box.success_delete'));
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
