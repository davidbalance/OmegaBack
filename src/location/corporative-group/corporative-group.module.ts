import { Module } from '@nestjs/common';
import { CorporativeGroupService } from './services/corporative-group.service';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CorporativeGroupExternalKeyModule } from './corporative-group-external-key/corporative-group-external-key.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CorporativeGroupController } from './controllers/corporative-group.controller';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { SelectorController } from './controllers/selector.controller';
import { ExternalConnectionService } from './services/external-connection.service';
import { SelectorService } from './services/selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroup]),
    CorporativeGroupExternalKeyModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CorporativeGroupController,
    ExternalConnectionController,
    SelectorController
  ],
  providers: [
    SelectorService,
    CorporativeGroupService,
    CorporativeGroupRepository,
    ExternalConnectionService,
  ],
  exports: [
    CorporativeGroupService,
    ExternalConnectionService
  ]
})
export class CorporativeGroupModule { }
