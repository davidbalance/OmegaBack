import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReportService } from './medical-report.service';

describe('MedicalReportService', () => {
  let service: MedicalReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalReportService],
    }).compile();

    service = module.get<MedicalReportService>(MedicalReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
