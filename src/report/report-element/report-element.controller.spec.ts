import { Test, TestingModule } from '@nestjs/testing';
import { ReportElementController } from './report-element.controller';
import { ReportElementService } from './report-element.service';

describe('ReportElementController', () => {
  let controller: ReportElementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportElementController],
      providers: [ReportElementService],
    }).compile();

    controller = module.get<ReportElementController>(ReportElementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
