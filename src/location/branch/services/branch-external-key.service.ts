import { AbstractExternalKeyService } from '@/shared/external-key';
import { Inject, Injectable } from '@nestjs/common';
import { BranchExternalKey } from '../entities/branch-external-key.entity';
import { BranchExternalKeyRepository } from '../repositories/branch-external-key.repository';

@Injectable()
export class BranchExternalKeyService extends AbstractExternalKeyService<BranchExternalKey, BranchExternalKeyRepository> {

  constructor(
    @Inject(BranchExternalKeyRepository) private readonly repository: BranchExternalKeyRepository
  ) {
    super(repository);
  }
}
