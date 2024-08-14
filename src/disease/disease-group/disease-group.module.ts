import { Module } from '@nestjs/common';
import { DiseaseGroup } from './entities/disease-group.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { DiseaseGroupRepository } from './repository/disease-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DiseaseGroupSelectorController } from './controllers/disease-group-selector.controller';
import { DiseaseGroupManagementController } from './controllers/disease-group-management.controller';
import { DiseaseGroupManagementService } from './services/disease-group-management.service';
import { DiseaseGroupSelectorService } from './services/disease-group-selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroup]),
    AuthenticationGuardModule
  ],
  controllers: [
    DiseaseGroupManagementController,
    DiseaseGroupSelectorController
  ],
  providers: [
    DiseaseGroupManagementService,
    DiseaseGroupSelectorService,
    DiseaseGroupRepository
  ],
  exports: [
    DiseaseGroupManagementService
  ]
})
export class DiseaseGroupModule { }
