import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { SqlDatabaseModule } from 'src/shared';
import { Role } from './entities/role.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository]
})
export class RoleModule { }
