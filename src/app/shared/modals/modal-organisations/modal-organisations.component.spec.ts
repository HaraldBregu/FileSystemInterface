import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrganisationsComponent } from './modal-organisations.component';

describe('ModalOrganisationsComponent', () => {
  let component: ModalOrganisationsComponent;
  let fixture: ComponentFixture<ModalOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalOrganisationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
