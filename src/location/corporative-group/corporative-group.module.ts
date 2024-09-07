import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupRepository } from './repositories/corporative-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CorporativeGroupExternalConnectionProvider, CorporativeGroupExternalConnectionService } from './services/corporative-group-external-connection.service';
import { CorporativeGroupExternalConnectionController } from './controllers/corporative-group-external-connection.controller';
import { CorporativeGroupExternalKeyService } from './services/corporative-group-external-key.service';
import { CorporativeGroupExternalKeyRepository } from './repositories/corporative-group-external-key.repository';
import { CorporativeGroupOptionController } from './controllers/corporative-group-option.controller';
import { CorporativeGroupPaginationController } from './controllers/corporative-group-pagination.controller';
import { CorporativeGroupPaginationService } from './services/corporative-group-pagination.service';
import { CorporativeGroupEntity } from './entities/corporative-group.entity';
import { CorporativeGroupExternalKeyEntity } from './entities/corporative-group-external-key.entity';
import { CorporativeGroupOptionService } from './services/corporative-group-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      CorporativeGroupEntity,
      CorporativeGroupExternalKeyEntity
    ]),
    AuthenticationGuardModule,
  ],
  controllers: [
    CorporativeGroupExternalConnectionController,
    CorporativeGroupOptionController,
    CorporativeGroupPaginationController,
  ],
  providers: [
    CorporativeGroupExternalKeyRepository,
    CorporativeGroupRepository,
    CorporativeGroupExternalConnectionService,
    CorporativeGroupExternalConnectionProvider,
    CorporativeGroupExternalKeyService,
    CorporativeGroupOptionService,
    CorporativeGroupPaginationService
  ],
  exports: [
    CorporativeGroupExternalConnectionProvider
  ]
})
export class CorporativeGroupModule { }
