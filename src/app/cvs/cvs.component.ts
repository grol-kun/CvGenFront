import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, takeUntil, Subject } from 'rxjs';
import { CV_COLUMNS } from '../shared/models/constants/cv-columns';
import { ColumnItem } from '../shared/models/interfaces/column-item';
import { Cv } from '../shared/models/interfaces/cv';
import { CvService } from '../shared/services/cv.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsComponent implements OnInit, OnDestroy {
  cvList$!: Observable<Cv[]>;
  private destroy$ = new Subject<void>();

  constructor(private messageService: NzMessageService, private cdr: ChangeDetectorRef, private cvService: CvService) {}

  ngOnInit() {
    this.getCvList();
  }

  getCvList() {
    this.cvList$ = this.cvService.getCvs().pipe(map((data) => data.data));
  }

  listOfColumns: ColumnItem[] = CV_COLUMNS;

  deleteItem(id: number) {
    this.cvService
      .deleteCvById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.messageService.create('success', `CV has just been deleted!`);
        this.getCvList();
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
