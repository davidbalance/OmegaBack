import { Module } from '@nestjs/common';
import { DiseaseGroupService } from './disease-group.service';
import { DiseaseGroupController } from './disease-group.controller';
import { DiseaseGroup } from './entities/disease-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { DiseaseGroupRepository } from './disease-group.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroup]),
  ],
  controllers: [DiseaseGroupController],
  providers: [
    DiseaseGroupService,
    DiseaseGroupRepository
  ],
  exports: [DiseaseGroupService]
})
export class DiseaseGroupModule { }
