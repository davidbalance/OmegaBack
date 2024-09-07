import { Inject, Injectable } from '@nestjs/common';
import { AbstractExternalKeyService } from '@/shared/external-key';
import { CorporativeGroupExternalKeyRepository } from '../repositories/corporative-group-external-key.repository';
import { CorporativeGroupExternalKeyEntity } from '../entities/corporative-group-external-key.entity';

@Injectable()
export class CorporativeGroupExternalKeyService
  extends AbstractExternalKeyService<CorporativeGroupExternalKeyEntity, CorporativeGroupExternalKeyRepository> {

  constructor(
    @Inject(CorporativeGroupExternalKeyRepository) private readonly repository: CorporativeGroupExternalKeyRepository
  ) {
    super(repository);
  }
}