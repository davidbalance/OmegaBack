import { Test, TestingModule } from '@nestjs/testing';
import { ReportValueController } from '../report-value.controller';
import { ReportValueService } from '../report-value.service';

describe('ReportValueController', () => {
  let controller: ReportValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportValueController],
      providers: [ReportValueService],
    }).compile();

    controller = module.get<ReportValueController>(ReportValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
