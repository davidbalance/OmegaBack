import { Module } from '@nestjs/common';
import { ManagementService } from './services/management.service';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Management } from './entities/management.entity';
import { ManagementController } from './controllers/management.controller';
import { ManagementRepository } from './repositories/management.repository';
import { ManagementPaginationService } from './services/management-pagination.service';
import { ManagementPaginationController } from './controllers/management-pagination.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Management]),
    AuthenticationGuardModule
  ],
  controllers: [
    ManagementController,
    ManagementPaginationController
  ],
  providers: [
    ManagementRepository,
    ManagementService,
    ManagementPaginationService
  ],
  exports: [
    ManagementService
  ]
})
export class ManagementModule { }
