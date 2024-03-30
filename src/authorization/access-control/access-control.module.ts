import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { SqlDatabaseModule } from '@/shared';
import { AccessControl } from './entity/access-control.entity';
import { AccessControlRepository } from './access-control.repository';
import { UserListener } from './listeners';
import { ResourceModule } from '../resource/resource.module';
import { RoleModule } from '../role/role.module';
import { AccessControlController } from './access-control.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([AccessControl]),
    RoleModule,
    ResourceModule
  ],
  providers: [
    AccessControlService,
    UserListener,
    AccessControlRepository],
  exports: [AccessControlService],
  controllers: [AccessControlController]
})
export class AccessControlModule { }
