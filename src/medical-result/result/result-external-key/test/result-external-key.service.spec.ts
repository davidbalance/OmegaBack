import { Test, TestingModule } from '@nestjs/testing';
import { ResultExternalKeyService } from '../result-external-key.service';

describe('ResultExternalKeyService', () => {
  let service: ResultExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultExternalKeyService],
    }).compile();

    service = module.get<ResultExternalKeyService>(ResultExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
