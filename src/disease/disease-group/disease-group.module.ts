import { Module } from '@nestjs/common';
import { DiseaseGroup } from './entities/disease-group.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { DiseaseGroupRepository } from './repository/disease-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DiseaseGroupManagementController } from './controllers/disease-group-management.controller';
import { DiseaseGroupManagementService } from './services/disease-group-management.service';
import { DiseaseGroupPaginationController } from './controllers/disease-group-pagination.controller';
import { DiseaseGroupPaginationService } from './services/disease-group-pagination.service';
import { DiseaseGroupFullController } from './controllers/disease-group-full.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroup]),
    AuthenticationGuardModule
  ],
  controllers: [
    DiseaseGroupFullController,
    DiseaseGroupManagementController,
    DiseaseGroupPaginationController,
  ],
  providers: [
    DiseaseGroupManagementService,
    DiseaseGroupPaginationService,
    DiseaseGroupRepository
  ],
  exports: [
    DiseaseGroupManagementService
  ]
})
export class DiseaseGroupModule { }
