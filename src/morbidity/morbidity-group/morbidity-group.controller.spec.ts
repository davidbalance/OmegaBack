import { Test, TestingModule } from '@nestjs/testing';
import { MorbidityGroupController } from './morbidity-group.controller';
import { MorbidityGroupService } from './morbidity-group.service';

describe('MorbidityGroupController', () => {
  let controller: MorbidityGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MorbidityGroupController],
      providers: [MorbidityGroupService],
    }).compile();

    controller = module.get<MorbidityGroupController>(MorbidityGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
