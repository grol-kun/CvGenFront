import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateControlComponent } from './translate-controlcomponent';

describe('TranslateControlComponent', () => {
  let component: TranslateControlComponent;
  let fixture: ComponentFixture<TranslateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslateControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
