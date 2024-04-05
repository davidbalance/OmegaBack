import { Module } from '@nestjs/common';
import { CorporativeGroupExternalKeyService } from './corporative-group-external-key.service';
import { CorporativeGroupExternalKeyRepository } from './corporative-group-external-key.repository';
import { SqlDatabaseModule } from '@/shared';
import { CorporativeGroupExternalKey } from './entities/corporative-group-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroupExternalKey])
  ],
  providers: [
    CorporativeGroupExternalKeyService,
    CorporativeGroupExternalKeyRepository
  ],
  exports: [CorporativeGroupExternalKeyService]
})
export class CorporativeGroupExternalKeyModule { }
