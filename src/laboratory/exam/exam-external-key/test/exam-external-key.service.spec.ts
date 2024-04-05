import { Test, TestingModule } from '@nestjs/testing';
import { ExamExternalKeyService } from '../exam-external-key.service';

describe('ExamExternalKeyService', () => {
  let service: ExamExternalKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamExternalKeyService],
    }).compile();

    service = module.get<ExamExternalKeyService>(ExamExternalKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
