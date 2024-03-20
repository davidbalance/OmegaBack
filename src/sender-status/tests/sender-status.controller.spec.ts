import { Test, TestingModule } from '@nestjs/testing';
import { SenderStatusController } from '../sender-status.controller';
import { SenderStatusService } from '../sender-status.service';

describe('SenderStatusController', () => {
  let controller: SenderStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SenderStatusController],
      providers: [SenderStatusService],
    }).compile();

    controller = module.get<SenderStatusController>(SenderStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
