import { Inject, Injectable } from '@nestjs/common';
import { AbstractExternalKeyService } from '@/shared';
import { ResultExternalKey } from './entities/result-external-key.entity';
import { ResultExternalKeyRepository } from './result-external-key.respository';

@Injectable()
export class ResultExternalKeyService extends AbstractExternalKeyService<ResultExternalKey, ResultExternalKeyRepository> {
  constructor(
    @Inject(ResultExternalKeyRepository) private readonly repository: ResultExternalKeyRepository
  ) {
    super(repository);
  }
}
