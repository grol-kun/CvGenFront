import { Injectable } from '@angular/core';
import * as PdfMake from 'pdfmake/build/pdfmake';
import * as PdfFonts from 'pdfmake/build/vfs_fonts';
import { CV } from '../models/interfaces/cv';
import { UserInfo } from '../models/interfaces/user-info';
import { PdfObjectBuilderService } from './pdf-object-builder.service';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  pdfMake: any;
  constructor(private pob: PdfObjectBuilderService) {
    (PdfMake.vfs as any) = PdfFonts.pdfMake.vfs;
    this.pdfMake = PdfMake;
  }

  generatePdf(cvObj: CV, userObj: UserInfo) {
    this.pdfMake.createPdf(this.pob.buildDocDefinition(cvObj, userObj)).open();
  }
}
