import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.scss'],
})
export class CvPreviewComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() user: UserInfo | null = null;
  @Input() previewCv!: Cv;

  constructor(private pdf: PdfService) {}

  levelFilledCounter(i: string) {
    return new Array(Number(i));
  }
  levelEmptyCounter(i: string) {
    return new Array(5 - Number(i));
  }

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit();
  }

  exportPdf() {  
    this.pdf.generatePdf(this.previewCv, this.user!);
  }
}
