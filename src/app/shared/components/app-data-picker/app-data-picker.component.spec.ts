import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataPickerComponent } from './app-data-picker.component';

describe('AppDataPickerComponent', () => {
  let component: AppDataPickerComponent;
  let fixture: ComponentFixture<AppDataPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDataPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
