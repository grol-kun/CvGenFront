import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CV_COLUMNS } from 'src/app/shared/models/constants/cv-columns';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { CvService } from 'src/app/shared/services/cv.service';

@Component({
  selector: 'app-cv-modal',
  templateUrl: './cv-modal.component.html',
  styleUrls: ['./cv-modal.component.scss'],
})
export class CvModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  cvSelected = new EventEmitter<Cv>();
  @Output()
  hideModals = new EventEmitter<boolean>();
  @Input() isVisible = false;

  cvList$!: Observable<Cv[]>;
  listOfColumns: ColumnItem[] = CV_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(private cvService: CvService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible: boolean = changes?.['isVisible']?.currentValue;

    if (isVisible) {
      this.isVisible = isVisible;
    }
  }

  ngOnInit(): void {
    this.cvList$ = this.cvService.getCvs().pipe(takeUntil(this.destroy$));
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModals.emit();
  }

  selectCv(cv: Cv) {
    this.cvSelected.emit(cv);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
