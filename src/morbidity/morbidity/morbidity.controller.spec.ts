import { Test, TestingModule } from '@nestjs/testing';
import { MorbidityController } from './morbidity.controller';
import { MorbidityService } from './morbidity.service';

describe('MorbidityController', () => {
  let controller: MorbidityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MorbidityController],
      providers: [MorbidityService],
    }).compile();

    controller = module.get<MorbidityController>(MorbidityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
