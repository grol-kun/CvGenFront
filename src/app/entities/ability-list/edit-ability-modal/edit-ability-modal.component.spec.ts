import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbilityModalComponent } from './edit-ability-modal.component';

describe('EditAbilityModalComponent', () => {
  let component: EditAbilityModalComponent;
  let fixture: ComponentFixture<EditAbilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbilityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAbilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
