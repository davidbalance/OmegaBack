import { forwardRef, Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { SqlDatabaseModule } from '@/shared';
import { AccessControl } from './entity/access-control.entity';
import { AccessControlRepository } from './access-control.repository';
import { CredentialListener } from './listeners';
import { ResourceModule } from '../resource/resource.module';
import { RoleModule } from '../role/role.module';
import { AccessControlController } from './access-control.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([AccessControl]),
    RoleModule,
    ResourceModule,
    AuthenticationGuardModule,
    forwardRef(() => LocalAuthorizationModule)
  ],
  controllers: [
    AccessControlController
  ],
  providers: [
    AccessControlService,
    CredentialListener,
    AccessControlRepository,
    AuthorizationGuard
  ],
  exports: [AccessControlService],
})
export class AccessControlModule { }
