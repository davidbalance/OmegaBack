import { Test, TestingModule } from '@nestjs/testing';
import { LocalStorageSaverService } from './local-storage.service';

describe('LocalStorageSaverService', () => {
  let service: LocalStorageSaverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStorageSaverService],
    }).compile();

    service = module.get<LocalStorageSaverService>(LocalStorageSaverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
