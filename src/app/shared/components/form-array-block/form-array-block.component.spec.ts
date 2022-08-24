import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayBlockComponent } from './form-array-block.component';

describe('FormArrayBlockComponent', () => {
  let component: FormArrayBlockComponent;
  let fixture: ComponentFixture<FormArrayBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormArrayBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormArrayBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
