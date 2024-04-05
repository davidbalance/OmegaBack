import { Test, TestingModule } from '@nestjs/testing';
import { CorporativeGroupExternalKeyController } from '../corporative-group-external-key.controller';
import { CorporativeGroupExternalKeyService } from '../corporative-group-external-key.service';

describe('CorporativeGroupExternalKeyController', () => {
  let controller: CorporativeGroupExternalKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporativeGroupExternalKeyController],
      providers: [CorporativeGroupExternalKeyService],
    }).compile();

    controller = module.get<CorporativeGroupExternalKeyController>(CorporativeGroupExternalKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
