import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReportController } from '../medical-report.controller';
import { MedicalReportService } from '../medical-report.service';

describe('MedicalReportController', () => {
  let controller: MedicalReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalReportController],
      providers: [MedicalReportService],
    }).compile();

    controller = module.get<MedicalReportController>(MedicalReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
