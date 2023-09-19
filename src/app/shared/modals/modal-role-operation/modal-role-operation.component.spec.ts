import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoleOperationComponent } from './modal-role-operation.component';

describe('ModalRoleOperationComponent', () => {
  let component: ModalRoleOperationComponent;
  let fixture: ComponentFixture<ModalRoleOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalRoleOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRoleOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
