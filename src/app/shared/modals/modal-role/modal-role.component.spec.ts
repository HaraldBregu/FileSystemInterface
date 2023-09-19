import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoleComponent } from './modal-role.component';

describe('ModalRoleComponent', () => {
  let component: ModalRoleComponent;
  let fixture: ComponentFixture<ModalRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
