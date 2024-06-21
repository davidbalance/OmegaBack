import { Test, TestingModule } from '@nestjs/testing';
import { CorporativeGroupExternalKeyService } from '../external-key.service';

describe('CorporativeGroupExternalKeyService', () => {
  let service: CorporativeGroupExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporativeGroupExternalKeyService],
    }).compile();

    service = module.get<CorporativeGroupExternalKeyService>(CorporativeGroupExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
