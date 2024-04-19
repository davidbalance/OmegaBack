import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { SqlDatabaseModule } from 'src/shared';
import { Role } from './entities/role.entity';
import { ResourceModule } from '../resource/resource.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Role]),
    ResourceModule,
    AuthenticationGuardModule,
    forwardRef(() => LocalAuthorizationModule)
  ],
  controllers: [
    RoleController
  ],
  providers: [
    RoleService,
    RoleRepository,
    AuthorizationGuard
  ],
  exports: [RoleService]
})
export class RoleModule { }
