import { SessionService } from './session.service';
import { TestBed } from '@automock/jest';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(SessionService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
