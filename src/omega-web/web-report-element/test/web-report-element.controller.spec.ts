import { Test, TestingModule } from '@nestjs/testing';
import { WebReportElementController } from '../web-report-element.controller';
import { WebReportElementService } from '../web-report-element.service';

describe('WebReportElementController', () => {
  let controller: WebReportElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebReportElementController],
      providers: [WebReportElementService],
    }).compile();

    controller = module.get<WebReportElementController>(WebReportElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
