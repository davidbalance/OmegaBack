import { Module } from '@nestjs/common';
import { CorporativeGroupManagementService } from './services/corporative-group-management.service';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupRepository } from './repositories/corporative-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CorporativeGroupExternalKey } from './entities/corporative-group-external-key.entity';
import { CorporativeGroupExternalConnectionProvider, CorporativeGroupExternalConnectionService } from './services/corporative-group-external-connection.service';
import { CorporativeGroupExternalConnectionController } from './controllers/corporative-group-external-connection.controller';
import { CorporativeGroupExternalKeyService } from './services/corporative-group-external-key.service';
import { CorporativeGroupExternalKeyRepository } from './repositories/corporative-group-external-key.repository';
import { LocationController } from './controllers/location.controller';
import { CorporativeGroupPaginationController } from './controllers/corporative-group-pagination.controller';
import { CorporativeGroupPaginationService } from './services/corporative-group-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroup, CorporativeGroupExternalKey]),
    AuthenticationGuardModule,
  ],
  controllers: [
    CorporativeGroupExternalConnectionController,
    CorporativeGroupPaginationController,
    LocationController,
  ],
  providers: [
    CorporativeGroupExternalKeyRepository,
    CorporativeGroupRepository,
    CorporativeGroupExternalConnectionProvider,
    CorporativeGroupExternalConnectionService,
    CorporativeGroupExternalKeyService,
    CorporativeGroupManagementService,
    CorporativeGroupPaginationService
  ],
  exports: [
    CorporativeGroupManagementService,
    CorporativeGroupExternalConnectionProvider
  ]
})
export class CorporativeGroupModule { }
