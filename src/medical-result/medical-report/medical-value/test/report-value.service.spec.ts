import { Test, TestingModule } from '@nestjs/testing';
import { ReportValueService } from '../report-value.service';

describe('ReportValueService', () => {
  let service: ReportValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportValueService],
    }).compile();

    service = module.get<ReportValueService>(ReportValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
