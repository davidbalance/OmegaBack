import { Test, TestingModule } from '@nestjs/testing';
import { FileDownloaderService } from './file-downloader.service';

describe('FileDownloaderService', () => {
  let service: FileDownloaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileDownloaderService],
    }).compile();

    service = module.get<FileDownloaderService>(FileDownloaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
