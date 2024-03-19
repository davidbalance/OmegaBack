import { Test, TestingModule } from '@nestjs/testing';
import { SenderStatusService } from './sender-status.service';

describe('SenderStatusService', () => {
  let service: SenderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenderStatusService],
    }).compile();

    service = module.get<SenderStatusService>(SenderStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
