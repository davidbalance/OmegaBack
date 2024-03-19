import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { SqlDatabaseModule } from 'src/shared';
import { Role } from './entities/role.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Role]),
    PermissionModule
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService]
})
export class RoleModule { }
