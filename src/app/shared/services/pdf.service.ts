import { Injectable } from '@angular/core';
import * as PdfMake from 'pdfmake/build/pdfmake';
import * as PdfFonts from 'pdfmake/build/vfs_fonts';
import { CV } from '../models/cv';
import { User } from '../models/user';
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

  generatePdf(cvObj: CV, userObj: User) {
    this.pdfMake.createPdf(this.pob.BuildDocDefinition(cvObj, userObj)).open();
  }
}
