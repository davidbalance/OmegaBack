import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReportSendAttributeService } from '../send-attribute.service';

describe('MedicalReportSendAttributeService', () => {
  let service: MedicalReportSendAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalReportSendAttributeService],
    }).compile();

    service = module.get<MedicalReportSendAttributeService>(MedicalReportSendAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
