import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProjectsArrayComponent } from './app-projects-array.component';

describe('AppProjectsArrayComponent', () => {
  let component: AppProjectsArrayComponent;
  let fixture: ComponentFixture<AppProjectsArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProjectsArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProjectsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
