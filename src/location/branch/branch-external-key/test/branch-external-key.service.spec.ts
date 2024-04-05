import { Test, TestingModule } from '@nestjs/testing';
import { BranchExternalKeyService } from '../branch-external-key.service';

describe('BranchExternalKeyService', () => {
  let service: BranchExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchExternalKeyService],
    }).compile();

    service = module.get<BranchExternalKeyService>(BranchExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
