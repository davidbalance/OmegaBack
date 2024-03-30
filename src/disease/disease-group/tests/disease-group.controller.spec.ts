import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseGroupController } from '../disease-group.controller';
import { DiseaseGroupService } from '../disease-group.service';

describe('DiseaseGroupController', () => {
  let controller: DiseaseGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseaseGroupController],
      providers: [DiseaseGroupService],
    }).compile();

    controller = module.get<DiseaseGroupController>(DiseaseGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
