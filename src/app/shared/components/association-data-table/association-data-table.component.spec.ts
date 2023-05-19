import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDataTableComponent } from './association-data-table.component';

describe('AssociationDataTableComponent', () => {
  let component: AssociationDataTableComponent;
  let fixture: ComponentFixture<AssociationDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AssociationDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
