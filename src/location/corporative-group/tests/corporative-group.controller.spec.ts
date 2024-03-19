import { Test, TestingModule } from '@nestjs/testing';
import { CorporativeGroupController } from '../corporative-group.controller';
import { CorporativeGroupService } from '../corporative-group.service';

describe('CorporativeGroupController', () => {
  let controller: CorporativeGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporativeGroupController],
      providers: [CorporativeGroupService],
    }).compile();

    controller = module.get<CorporativeGroupController>(CorporativeGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
