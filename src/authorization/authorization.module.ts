import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AccessControlModule } from './access-control/access-control.module';

@Module({
  imports: [RoleModule, PermissionModule, AccessControlModule],
  providers: []
})
export class AuthorizationModule {}
