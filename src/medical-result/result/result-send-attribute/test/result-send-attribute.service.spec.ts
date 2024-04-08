import { Test, TestingModule } from '@nestjs/testing';
import { ResultSendAttributeService } from '../result-send-attribute.service';

describe('ResultSendAttributeService', () => {
  let service: ResultSendAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultSendAttributeService],
    }).compile();

    service = module.get<ResultSendAttributeService>(ResultSendAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
