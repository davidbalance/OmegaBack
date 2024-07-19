import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Area } from './entities/area.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ManagementModule } from '../management/management.module';
import { AreaRepository } from './repositories/area.repository';
import { AreaManagementController } from './controllers/area-management.controller';
import { AreaManagementService } from './services/area-management.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Area]),
    AuthenticationGuardModule,
    ManagementModule
  ],
  controllers: [
    AreaManagementController
  ],
  providers: [
    AreaManagementService,
    AreaRepository
  ],
  exports: [
    AreaManagementService
  ]
})
export class AreaModule { }
