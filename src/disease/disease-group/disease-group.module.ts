import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { DiseaseGroupRepository } from './repository/disease-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DiseaseGroupManagementController } from './controllers/disease-group-management.controller';
import { DiseaseGroupManagementService } from './services/disease-group-management.service';
import { DiseaseGroupPaginationController } from './controllers/disease-group-pagination.controller';
import { DiseaseGroupPaginationService } from './services/disease-group-pagination.service';
import { DiseaseGroupEntity } from './entities/disease-group.entity';
import { DiseaseGroupOptionController } from './controllers/disease-group-option.controller';
import { DiseaseGroupOptionService } from './services/disease-group-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroupEntity]),
    AuthenticationGuardModule
  ],
  controllers: [
    DiseaseGroupManagementController,
    DiseaseGroupOptionController,
    DiseaseGroupPaginationController,
  ],
  providers: [
    DiseaseGroupRepository,
    DiseaseGroupManagementService,
    DiseaseGroupOptionService,
    DiseaseGroupPaginationService,
  ],
  exports: [
    DiseaseGroupManagementService
  ]
})
export class DiseaseGroupModule { }
