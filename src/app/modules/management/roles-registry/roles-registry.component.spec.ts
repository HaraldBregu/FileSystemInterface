import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesRegistryComponent } from './roles-registry.component';

describe('RolesRegistryComponent', () => {
  let component: RolesRegistryComponent;
  let fixture: ComponentFixture<RolesRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
