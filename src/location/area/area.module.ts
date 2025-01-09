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
import { AreaOptionController } from './controllers/area-option.controller';
import { AreaOptionService } from './services/area-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([AreaEntity]),
    AuthenticationGuardModule,
    ManagementModule
  ],
  controllers: [
    AreaManagementController,
    AreaPaginationController,
    AreaOptionController
  ],
  providers: [
    AreaRepository,
    AreaManagementService,
    AreaPaginationService,
    AreaOptionService
  ],
  exports: [
    AreaManagementService
  ]
})
export class AreaModule { }
