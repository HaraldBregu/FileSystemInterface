import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVariantCreateComponent } from './modal-variant-create.component';

describe('ModalVariantCreateComponent', () => {
  let component: ModalVariantCreateComponent;
  let fixture: ComponentFixture<ModalVariantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalVariantCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVariantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
