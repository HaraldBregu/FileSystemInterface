import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPartnerCreateComponent } from './modal-partner-create.component';

describe('ModalPartnerCreateComponent', () => {
  let component: ModalPartnerCreateComponent;
  let fixture: ComponentFixture<ModalPartnerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPartnerCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPartnerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
