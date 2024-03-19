import { Test, TestingModule } from '@nestjs/testing';
import { MorbidityService } from '../morbidity.service';

describe('MorbidityService', () => {
  let service: MorbidityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MorbidityService],
    }).compile();

    service = module.get<MorbidityService>(MorbidityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
