import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { CV_COLUMNS } from 'src/app/shared/models/constants/cv-columns';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { CvService } from 'src/app/shared/services/cv.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnChanges {
  @Output()
  cvSelected = new EventEmitter<Cv>();
  @Output()
  visibleStatusChange = new EventEmitter<boolean>();
  @Input() isVisible = false;

  cvList$!: Observable<Cv[]>;
  listOfColumns: ColumnItem[] = CV_COLUMNS;

  constructor(private cvService: CvService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isVisible: boolean = changes?.['isVisible']?.currentValue;

    if (isVisible) {
      console.log('isVisible: ', isVisible);
      this.isVisible = isVisible;
    }
  }

  ngOnInit(): void {
    this.cvList$ = this.cvService.getCvs();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.visibleStatusChange.emit(false);
  }

  selectCv(cv: Cv) {
    this.cvSelected.emit(cv);
  }
}
