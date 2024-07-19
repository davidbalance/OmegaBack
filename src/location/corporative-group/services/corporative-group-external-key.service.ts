import { Inject, Injectable, Provider } from '@nestjs/common';
import { AbstractExternalKeyService } from '@/shared/external-key';
import { CorporativeGroupExternalKey } from '../entities/corporative-group-external-key.entity';
import { CorporativeGroupExternalKeyRepository } from '../repositories/corporative-group-external-key.repository';

@Injectable()
export class CorporativeGroupExternalKeyService
  extends AbstractExternalKeyService<CorporativeGroupExternalKey, CorporativeGroupExternalKeyRepository> {

  constructor(
    @Inject(CorporativeGroupExternalKeyRepository) private readonly repository: CorporativeGroupExternalKeyRepository
  ) {
    super(repository);
  }
}