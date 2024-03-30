import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseGroupService } from '../disease-group.service';

describe('DiseaseGroupService', () => {
  let service: DiseaseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseaseGroupService],
    }).compile();

    service = module.get<DiseaseGroupService>(DiseaseGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
