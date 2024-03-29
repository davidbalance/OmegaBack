import { Test, TestingModule } from '@nestjs/testing';
import { WebReportElementService } from './web-report-element.service';

describe('WebReportElementService', () => {
  let service: WebReportElementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebReportElementService],
    }).compile();

    service = module.get<WebReportElementService>(WebReportElementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
