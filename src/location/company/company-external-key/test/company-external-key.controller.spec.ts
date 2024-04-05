import { Test, TestingModule } from '@nestjs/testing';
import { CompanyExternalKeyController } from '../company-external-key.controller';
import { CompanyExternalKeyService } from '../company-external-key.service';

describe('CompanyExternalKeyController', () => {
  let controller: CompanyExternalKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyExternalKeyController],
      providers: [CompanyExternalKeyService],
    }).compile();

    controller = module.get<CompanyExternalKeyController>(CompanyExternalKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
