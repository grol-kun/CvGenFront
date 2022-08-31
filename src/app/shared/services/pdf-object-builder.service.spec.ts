import { TestBed } from '@angular/core/testing';

import { PdfObjectBuilderService } from './pdf-object-builder.service';

describe('PdfObjectBuilderService', () => {
  let service: PdfObjectBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfObjectBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
