import { Test, TestingModule } from '@nestjs/testing';
import { MedicalClientController } from './medical-client.controller';
import { MedicalClientService } from './medical-client.service';

describe('MedicalClientController', () => {
  let controller: MedicalClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalClientController],
      providers: [MedicalClientService],
    }).compile();

    controller = module.get<MedicalClientController>(MedicalClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
