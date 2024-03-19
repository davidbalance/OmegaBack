import { Test, TestingModule } from '@nestjs/testing';
import { ReportElementService } from '../report-element.service';

describe('ReportElementService', () => {
  let service: ReportElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportElementService],
    }).compile();

    service = module.get<ReportElementService>(ReportElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
