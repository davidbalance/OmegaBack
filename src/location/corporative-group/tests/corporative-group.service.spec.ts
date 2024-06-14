import { Test, TestingModule } from '@nestjs/testing';
import { CorporativeGroupService } from '../services/corporative-group.service';

describe('CorporativeGroupService', () => {
  let service: CorporativeGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporativeGroupService],
    }).compile();

    service = module.get<CorporativeGroupService>(CorporativeGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
