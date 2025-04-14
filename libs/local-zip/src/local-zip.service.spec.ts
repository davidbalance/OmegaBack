import { Test, TestingModule } from '@nestjs/testing';
import { LocalZipService } from './local-zip.service';
import { ZipToken } from './local-zip.dependency';

describe('LocalZipService', () => {
  let service: LocalZipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ZipToken,
          useValue: {}
        },
        LocalZipService
      ],
    }).compile();

    service = module.get<LocalZipService>(LocalZipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
