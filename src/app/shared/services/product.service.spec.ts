import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should return product information with properties', () => {

    service.get("CCN_LISTINO", 45).subscribe((res) => {
      expect(res).toBeDefined();
    })

  });

});
