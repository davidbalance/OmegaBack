import { Inject, Injectable } from '@nestjs/common';
import { AbstractExternalKeyService } from '@/shared';
import { ExternalKey } from './entities/external-key.entity';
import { ExternalKeyRepository } from './external-key.repository';

@Injectable()
export class ExternalKeyService extends AbstractExternalKeyService<ExternalKey, ExternalKeyRepository> {

  constructor(
    @Inject(ExternalKeyRepository) private readonly repository: ExternalKeyRepository
  ) {
    super(repository);
  }
}
