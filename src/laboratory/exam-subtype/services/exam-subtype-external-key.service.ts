import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeExternalKey } from '../entities/exam-subtype-external-key.entity';
import { ExamSubtypeExternalKeyRepository } from '../repositories/exam-subtype-external-key.repository';

@Injectable()
export class ExamSubtypeExternalKeyService extends AbstractExternalKeyService<ExamSubtypeExternalKey, ExamSubtypeExternalKeyRepository> {
  constructor(
    @Inject(ExamSubtypeExternalKeyRepository) private readonly repository: ExamSubtypeExternalKeyRepository
  ) {
    super(repository);
  }
}
