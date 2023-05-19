import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnvironmentsComponent } from './modal-environments.component';

describe('ModalEnvironmentsComponent', () => {
  let component: ModalEnvironmentsComponent;
  let fixture: ComponentFixture<ModalEnvironmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalEnvironmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
