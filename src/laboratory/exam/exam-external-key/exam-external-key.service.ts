import { AbstractExternalKeyService } from '@/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ExamExternalKey } from './entities/exam-external-key.entity';
import { ExamExternalKeyRepository } from './exam-external-key.repository';

@Injectable()
export class ExamExternalKeyService extends AbstractExternalKeyService<ExamExternalKey, ExamExternalKeyRepository> {
  constructor(
    @Inject(ExamExternalKeyRepository) private readonly repository: ExamExternalKeyRepository
  ) {
    super(repository);
  }
}
