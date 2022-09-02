import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvModalComponent } from './cv-modal.component';

describe('ModalComponent', () => {
  let component: CvModalComponent;
  let fixture: ComponentFixture<CvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
