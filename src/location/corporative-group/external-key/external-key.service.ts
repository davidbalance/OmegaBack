import { Inject, Injectable } from '@nestjs/common';
import { ExternalKeyRepository } from './external-key.repository';
import { ExternalKey } from './entities/external-key.entity';
import { AbstractExternalKeyService } from '@/shared';

@Injectable()
export class ExternalKeyService
  extends AbstractExternalKeyService<ExternalKey, ExternalKeyRepository> {

  constructor(
    @Inject(ExternalKeyRepository) private readonly repository: ExternalKeyRepository
  ) {
    super(repository);
  }
}
