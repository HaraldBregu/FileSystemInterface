import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOperationsComponent } from './partner-operations.component';

describe('PartnerOperationsComponent', () => {
  let component: PartnerOperationsComponent;
  let fixture: ComponentFixture<PartnerOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
