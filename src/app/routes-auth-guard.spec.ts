import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routesAuthGuard } from './routes-auth-guard';

describe('routesAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routesAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
