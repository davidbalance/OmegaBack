import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { ExamExternalKey } from '../entities/exam-external-key.entity';
import { ExamExternalKeyRepository } from '../repositories/exam-external-key.repository';

@Injectable()
export class ExamExternalKeyService extends AbstractExternalKeyService<ExamExternalKey, ExamExternalKeyRepository> {
  constructor(
    @Inject(ExamExternalKeyRepository) private readonly repository: ExamExternalKeyRepository
  ) {
    super(repository);
  }
}
