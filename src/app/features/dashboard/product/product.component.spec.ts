import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DashboardModel } from '../store';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore<DashboardModel>;

  const initialState: DashboardModel = {
    loading: false,
    catalogs: [],
    currentCatalog: undefined,
    filteredCatalogs: [],
    products: [],
    currentProduct: undefined,
    error: undefined,
    navItems: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
      ],
      providers: [
        provideMockStore({
          initialState
        }),
      ]
    }).compileComponents();

    store = TestBed.get<Store>(Store);

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
