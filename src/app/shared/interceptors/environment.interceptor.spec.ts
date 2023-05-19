import { TestBed } from '@angular/core/testing';

import { EnvironmentInterceptor } from './environment.interceptor';

describe('EnvironmentInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnvironmentInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EnvironmentInterceptor = TestBed.inject(EnvironmentInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
