import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ManagementModule } from '../management/management.module';
import { AreaRepository } from './repositories/area.repository';
import { AreaManagementController } from './controllers/area-management.controller';
import { AreaManagementService } from './services/area-management.service';
import { AreaPaginationController } from './controllers/area-pagination.controller';
import { AreaPaginationService } from './services/area-pagination.service';
import { AreaEntity } from './entities/area.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([AreaEntity]),
    AuthenticationGuardModule,
    ManagementModule
  ],
  controllers: [
    AreaManagementController,
    AreaPaginationController
  ],
  providers: [
    AreaRepository,
    AreaManagementService,
    AreaPaginationService,
  ],
  exports: [
    AreaManagementService
  ]
})
export class AreaModule { }
