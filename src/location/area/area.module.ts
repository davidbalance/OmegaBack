import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Area } from './entities/area.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ManagementModule } from '../management/management.module';
import { AreaRepository } from './repositories/area.repository';
import { AreaManagementController } from './controllers/area-management.controller';
import { AreaManagementService } from './services/area-management.service';
import { AreaPaginationController } from './controllers/area-pagination.controller';
import { AreaPaginationService } from './services/area-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Area]),
    AuthenticationGuardModule,
    ManagementModule
  ],
  controllers: [
    AreaManagementController,
    AreaPaginationController
  ],
  providers: [
    AreaManagementService,
    AreaPaginationService,
    AreaRepository
  ],
  exports: [
    AreaManagementService
  ]
})
export class AreaModule { }
