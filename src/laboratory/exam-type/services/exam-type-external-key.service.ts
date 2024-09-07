import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { ExamTypeExternalKeyEntity } from '../entities/exam-type-external-key.entity';
import { ExamTypeExternalKeyRepository } from '../repositories/exam-type-external-key.repository';

@Injectable()
export class ExamTypeExternalKeyService
  extends AbstractExternalKeyService<ExamTypeExternalKeyEntity, ExamTypeExternalKeyRepository> {
  constructor(
    @Inject(ExamTypeExternalKeyRepository) private readonly repository: ExamTypeExternalKeyRepository
  ) {
    super(repository);
  }
}
