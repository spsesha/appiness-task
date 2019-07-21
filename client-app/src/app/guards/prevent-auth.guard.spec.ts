import { TestBed, async, inject } from '@angular/core/testing';

import { PreventAuthGuard } from './prevent-auth.guard';

describe('PreventAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventAuthGuard]
    });
  });

  it('should ...', inject([PreventAuthGuard], (guard: PreventAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
