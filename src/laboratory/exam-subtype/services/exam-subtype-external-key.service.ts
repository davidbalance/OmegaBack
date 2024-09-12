import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { ExamSubtypeExternalKeyRepository } from '../repositories/exam-subtype-external-key.repository';
import { ExamSubtypeExternalKeyEntity } from '../entities/exam-subtype-external-key.entity';

@Injectable()
export class ExamSubtypeExternalKeyService
  extends AbstractExternalKeyService<ExamSubtypeExternalKeyEntity, ExamSubtypeExternalKeyRepository> {
  constructor(
    @Inject(ExamSubtypeExternalKeyRepository) private readonly repository: ExamSubtypeExternalKeyRepository
  ) {
    super(repository);
  }
}
