import { Module } from '@nestjs/common';
import { CorporativeGroupService } from './services/corporative-group.service';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { ExternalKeyModule } from './external-key/external-key.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CorporativeGroupController } from './controllers/corporative-group.controller';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { SelectorController } from './controllers/selector.controller';
import { CorporativeGroupSelectorService } from './services/selector.service';
import { ExternalConnectionService } from './services/external-connection.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroup]),
    ExternalKeyModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CorporativeGroupController,
    ExternalConnectionController,
    SelectorController
  ],
  providers: [
    CorporativeGroupSelectorService,
    CorporativeGroupService,
    CorporativeGroupRepository,
    ExternalConnectionService
  ],
  exports: [
    CorporativeGroupService,
    ExternalConnectionService
  ]
})
export class CorporativeGroupModule { }
