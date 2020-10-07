import { TestBed } from '@angular/core/testing';

import { UsersStore } from 'src/app/components/users/services/users.store';

describe('UsersService', () => {
  let service: UsersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
