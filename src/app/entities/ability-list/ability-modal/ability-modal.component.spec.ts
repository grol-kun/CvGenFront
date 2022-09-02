import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityModalComponent } from './ability-modal.component';

describe('AbilityModalComponent', () => {
  let component: AbilityModalComponent;
  let fixture: ComponentFixture<AbilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
