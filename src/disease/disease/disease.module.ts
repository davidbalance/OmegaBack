import { Module } from '@nestjs/common';
import { DiseaseManagementService } from './services/disease-management.service';
import { DiseaseController } from './controllers/disease-management.controller';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Disease } from './entities/disease.entity';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';
import { DiseaseRepository } from './repositories/disease.repository';
import { DiseasePaginationService } from './services/disease-pagination.service';
import { DiseasePaginationController } from './controllers/disease-pagination.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule,
  ],
  controllers: [
    DiseaseController,
    DiseasePaginationController
  ],
  providers: [
    DiseaseRepository,
    DiseaseManagementService,
    DiseasePaginationService
  ],
  exports: [
    DiseaseManagementService
  ]
})
export class DiseaseModule { }
