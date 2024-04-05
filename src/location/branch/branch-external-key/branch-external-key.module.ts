import { Module } from '@nestjs/common';
import { BranchExternalKeyService } from './branch-external-key.service';
import { SqlDatabaseModule } from '@/shared';
import { BranchExternalKey } from './entities/branch-external-key.entity';
import { BranchExternalKeyRepository } from './branch-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([BranchExternalKey])
  ],
  providers: [
    BranchExternalKeyService,
    BranchExternalKeyRepository
  ],
  exports: [BranchExternalKeyService],
})
export class BranchExternalKeyModule { }
