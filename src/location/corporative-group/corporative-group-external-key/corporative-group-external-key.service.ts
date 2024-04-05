import { Inject, Injectable } from '@nestjs/common';
import { CorporativeGroupExternalKeyRepository } from './corporative-group-external-key.repository';
import { CorporativeGroupExternalKey } from './entities/corporative-group-external-key.entity';
import { AbstractExternalKeyService } from '@/shared';

@Injectable()
export class CorporativeGroupExternalKeyService
  extends AbstractExternalKeyService<CorporativeGroupExternalKey, CorporativeGroupExternalKeyRepository> {

  constructor(
    @Inject(CorporativeGroupExternalKeyRepository) private readonly repository: CorporativeGroupExternalKeyRepository
  ) {
    super(repository);
  }
}
