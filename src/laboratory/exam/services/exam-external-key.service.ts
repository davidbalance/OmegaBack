import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { ExamExternalKeyRepository } from '../repositories/exam-external-key.repository';
import { ExamExternalKeyEntity } from '../entities/exam-external-key.entity';

@Injectable()
export class ExamExternalKeyService extends AbstractExternalKeyService<ExamExternalKeyEntity, ExamExternalKeyRepository> {
  constructor(
    @Inject(ExamExternalKeyRepository) private readonly repository: ExamExternalKeyRepository
  ) {
    super(repository);
  }
}
