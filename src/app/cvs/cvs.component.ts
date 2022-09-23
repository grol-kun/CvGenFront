import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil, Subject, BehaviorSubject, switchMap } from 'rxjs';
import { CV_COLUMNS } from '../shared/models/constants/cv-columns';
import { DataTypeEnum } from '../shared/models/emuns/data-type.enum';
import { Cv } from '../shared/models/interfaces/cv';
import { Entity } from '../shared/models/types/entity';
import { CvService } from '../shared/services/cv.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent implements OnInit, OnDestroy {
  cvList$ = new BehaviorSubject<Cv[]>([]);
  CV_COLUMNS = CV_COLUMNS;
  dataTypeEnum = DataTypeEnum;

  private destroy$ = new Subject<void>();

  constructor(
    private messageService: NzMessageService,
    private cvService: CvService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCvList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.cvList$.next(data));
  }

  getCvList() {
    return this.cvService.getCvs();
  }

  deleteItem(id: number) {
    this.cvService
      .deleteCvById(id)
      .pipe(
        switchMap(() => this.getCvList()),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.cvList$.next(data);
        this.messageService.create('success', this.translateService.instant('message_box.success_cv_delete'));
      });
  }

  redirect(data: Entity) {
    this.router.navigate([`/${this.dataTypeEnum.cvs}/`, data.id]);
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
