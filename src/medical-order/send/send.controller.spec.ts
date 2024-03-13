import { Test, TestingModule } from '@nestjs/testing';
import { SendController } from './send.controller';
import { SendService } from './send.service';

describe('SendController', () => {
  let controller: SendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendController],
      providers: [SendService],
    }).compile();

    controller = module.get<SendController>(SendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
