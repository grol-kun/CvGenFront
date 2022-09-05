import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cv } from 'src/app/shared/models/interfaces/cv';
import { UserInfo } from 'src/app/shared/models/interfaces/user-info';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.scss'],
})
export class CvPreviewComponent implements OnInit {
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() isVisible = false;
  @Input() user: UserInfo | null = null
  @Input() previewCv!: Cv;

  constructor(private pdf: PdfService) {}

  ngOnInit(): void {}

  handleCancel(): void {
    this.isVisible = false;
    this.hideModal.emit();
  }

  exportPdf(){
    console.log(this.previewCv);
    console.log(this.user);    
    this.pdf.generatePdf(this.previewCv, this.user!);
  }
}
