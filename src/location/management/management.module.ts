import { Module } from '@nestjs/common';
import { ManagementService } from './services/management.service';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { ManagementController } from './controllers/management.controller';
import { ManagementRepository } from './repositories/management.repository';
import { ManagementPaginationService } from './services/management-pagination.service';
import { ManagementPaginationController } from './controllers/management-pagination.controller';
import { ManagementEntity } from './entities/management.entity';
import { ManagementOptionController } from './controllers/management-option.controller';
import { ManagementOptionService } from './services/management-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ManagementEntity]),
    AuthenticationGuardModule
  ],
  controllers: [
    ManagementOptionController,
    ManagementPaginationController,
    ManagementController,
  ],
  providers: [
    ManagementRepository,
    ManagementOptionService,
    ManagementPaginationService,
    ManagementService,
  ],
  exports: [
    ManagementService
  ]
})
export class ManagementModule { }
