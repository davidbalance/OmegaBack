import { Test, TestingModule } from '@nestjs/testing';
import { CompanyExternalKeyService } from '../external-key.service';

describe('CompanyExternalKeyService', () => {
  let service: CompanyExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyExternalKeyService],
    }).compile();

    service = module.get<CompanyExternalKeyService>(CompanyExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
