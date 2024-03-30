import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Disease } from './entities/disease.entity';
import { DiseaseRepository } from './disease.repository';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule
  ],
  controllers: [DiseaseController],
  providers: [
    DiseaseService,
    DiseaseRepository
  ],
  exports: [DiseaseService]
})
export class DiseaseModule { }
