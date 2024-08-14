import { Module } from '@nestjs/common';
import { CorporativeGroupManagementService } from './services/corporative-group-management.service';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupRepository } from './repositories/corporative-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CorporativeGroupSelectorService } from './services/corporative-group-selector.service';
import { CorporativeGroupExternalKey } from './entities/corporative-group-external-key.entity';
import { CorporativeGroupExternalConnectionProvider, CorporativeGroupExternalConnectionService } from './services/corporative-group-external-connection.service';
import { CorporativeGroupManagementController } from './controllers/corporative-group-management.controller';
import { CorporativeGroupSelectorController } from './controllers/corporative-group-selector.controller';
import { CorporativeGroupExternalConnectionController } from './controllers/corporative-group-external-connection.controller';
import { CorporativeGroupExternalKeyService } from './services/corporative-group-external-key.service';
import { CorporativeGroupExternalKeyRepository } from './repositories/corporative-group-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroup, CorporativeGroupExternalKey]),
    AuthenticationGuardModule,
  ],
  controllers: [
    CorporativeGroupManagementController,
    CorporativeGroupExternalConnectionController,
    CorporativeGroupSelectorController
  ],
  providers: [
    CorporativeGroupSelectorService,
    CorporativeGroupManagementService,
    CorporativeGroupRepository,
    CorporativeGroupExternalKeyRepository,
    CorporativeGroupExternalKeyService,
    CorporativeGroupExternalConnectionService,
    CorporativeGroupExternalConnectionProvider
  ],
  exports: [
    CorporativeGroupManagementService,
    CorporativeGroupExternalConnectionProvider
  ]
})
export class CorporativeGroupModule { }
