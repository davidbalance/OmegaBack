import { Module } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';
import { CorporativeGroupController } from './corporative-group.controller';
import { CorporativeGroup } from './entities/corporative-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CorporativeGroupRepository } from './corporative-group.repository';
import { CGExternalConnectionController } from './external-connection/c-g-external-connection.controller';
import { CGExternalConnectionService } from './external-connection/c-g-external-connection.service';
import { CorporativeGroupExternalKeyModule } from './corporative-group-external-key/corporative-group-external-key.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CorporativeGroup]),
    CorporativeGroupExternalKeyModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [
    CorporativeGroupController,
    CGExternalConnectionController
  ],
  providers: [
    CorporativeGroupService,
    CorporativeGroupRepository,
    CGExternalConnectionService,
    AuthorizationGuard
  ],
  exports: [
    CorporativeGroupService,
    CGExternalConnectionService
  ]
})
export class CorporativeGroupModule { }
