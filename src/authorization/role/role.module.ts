import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { SqlDatabaseModule } from 'src/shared';
import { Role } from './entities/role.entity';
import { ResourceModule } from '../resource/resource.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Role]),
    ResourceModule,
    AuthenticationGuardModule
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository
  ],
  exports: [RoleService]
})
export class RoleModule { }
