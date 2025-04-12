import { Module } from '@nestjs/common';
import { DiseaseManagementService } from './services/disease-management.service';
import { DiseaseController } from './controllers/disease-management.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Disease } from './entities/disease.entity';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';
import { DiseaseSelectorController } from './controllers/disease-selector.controller';
import { DiseaseSelectorService } from './services/disease-selector.service';
import { DiseaseRepository } from './repositories/disease.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule,
  ],
  controllers: [
    DiseaseController,
    DiseaseSelectorController
  ],
  providers: [
    DiseaseManagementService,
    DiseaseRepository,
    DiseaseSelectorService,
  ],
  exports: [
    DiseaseManagementService
  ]
})
export class DiseaseModule { }
