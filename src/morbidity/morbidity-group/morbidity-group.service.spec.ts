import { Test, TestingModule } from '@nestjs/testing';
import { MorbidityGroupService } from './morbidity-group.service';

describe('MorbidityGroupService', () => {
  let service: MorbidityGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MorbidityGroupService],
    }).compile();

    service = module.get<MorbidityGroupService>(MorbidityGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
