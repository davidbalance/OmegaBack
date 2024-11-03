import { Test, TestingModule } from '@nestjs/testing';
import { UrlFileFetcherService } from './url-file-fetcher.service';
import { NestUuid } from '../nest-ext/nest-uuid/nest-uuid.type';
import { TestBed } from '@automock/jest';
import { NEST_UUID } from '../nest-ext/nest-uuid/inject-token';

describe('UrlFileFetcherService', () => {
  let service: UrlFileFetcherService;
  let uuid: jest.Mocked<NestUuid>

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlFileFetcherService).compile();

    service = unit;
    uuid = unitRef.get(NEST_UUID);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
