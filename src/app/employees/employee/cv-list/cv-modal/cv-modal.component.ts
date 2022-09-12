import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CV_COLUMNS } from 'src/app/shared/models/constants/cv-columns';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { CvService } from 'src/app/shared/services/cv.service';

@Component({
  selector: 'app-cv-modal',
  templateUrl: './cv-modal.component.html',
  styleUrls: ['./cv-modal.component.scss'],
})
export class CvModalComponent implements OnInit {
  @Output()
  cvSelected = new EventEmitter<Cv>();
  @Output()
  hideModals = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() currentCvList: Cv[] = [];

  cvList$!: Observable<Cv[]>;
  listOfColumns: ColumnItem[] = CV_COLUMNS;

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.cvList$ = this.cvService.getCvs();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModals.emit();
  }

  selectCv(cv: Cv) {
    this.cvSelected.emit(cv);
  }

  isNotEmpty(cvList$: Cv[] | null) {
    if (cvList$) {
      return this.currentCvList ? cvList$.length > this.currentCvList.length : !this.currentCvList;
    }
    return null;
  }
}
