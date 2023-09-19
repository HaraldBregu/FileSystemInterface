import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRoleOperationComponent } from './partner-role-operation.component';

describe('PartnerRoleOperationComponent', () => {
  let component: PartnerRoleOperationComponent;
  let fixture: ComponentFixture<PartnerRoleOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRoleOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerRoleOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
