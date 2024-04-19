import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AccessControlModule } from './access-control/access-control.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    RoleModule,
    AccessControlModule,
    ResourceModule
  ]
})
export class AuthorizationModule { }
