import { Module } from '@nestjs/common';
import { DiseaseManagementService } from './services/disease-management.service';
import { DiseaseController } from './controllers/disease.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Disease } from './entities/disease.entity';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';
import { SelectorController } from './controllers/selector.controller';
import { SelectorService } from './services/selector.service';
import { DiseaseRepository } from './repositories/disease.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule,
  ],
  controllers: [
    DiseaseController,
    SelectorController
  ],
  providers: [
    DiseaseManagementService,
    DiseaseRepository,
    SelectorService,
  ],
  exports: [
    DiseaseManagementService
  ]
})
export class DiseaseModule { }
