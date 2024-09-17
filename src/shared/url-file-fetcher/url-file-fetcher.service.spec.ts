import { Test, TestingModule } from '@nestjs/testing';
import { UrlFileFetcherService } from './url-file-fetcher.service';

describe('UrlFileFetcherService', () => {
  let service: UrlFileFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlFileFetcherService],
    }).compile();

    service = module.get<UrlFileFetcherService>(UrlFileFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
