import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AccessControlModule } from './access-control/access-control.module';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [RoleModule, PermissionModule, AccessControlModule],
  providers: [AuthorizationService]
})
export class AuthorizationModule {}
