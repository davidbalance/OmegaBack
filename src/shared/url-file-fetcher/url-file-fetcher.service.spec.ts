import { Test, TestingModule } from '@nestjs/testing';
import { UrlFileFetcherService } from './url-file-fetcher.service';
import { Uuid } from '../nest-ext/uuid/uuid.type';
import { TestBed } from '@automock/jest';
import { NEST_UUID } from '../nest-ext/uuid/inject-token';

describe('UrlFileFetcherService', () => {
  let service: UrlFileFetcherService;
  let uuid: jest.Mocked<Uuid>

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlFileFetcherService).compile();

    service = unit;
    uuid = unitRef.get(NEST_UUID);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
