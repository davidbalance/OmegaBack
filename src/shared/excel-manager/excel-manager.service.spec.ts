import { Test, TestingModule } from '@nestjs/testing';
import { ExcelManagerService } from './excel-manager.service';

describe('ExcelManagerService', () => {
  let service: ExcelManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelManagerService],
    }).compile();

    service = module.get<ExcelManagerService>(ExcelManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
