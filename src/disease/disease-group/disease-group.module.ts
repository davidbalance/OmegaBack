import { Module } from '@nestjs/common';
import { DiseaseGroup } from './entities/disease-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { DiseaseGroupRepository } from './repository/disease-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { DiseaseGroupController } from './controllers/disease-group.controller';
import { DiseaseGroupService } from './services/disease-group-management.service';
import { SelectorController } from './controllers/selector.controller';
import { SelectorService } from './services/disease-group-selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroup]),
    AuthenticationGuardModule
  ],
  controllers: [
    DiseaseGroupController,
    SelectorController
  ],
  providers: [
    DiseaseGroupService,
    SelectorService,
    DiseaseGroupRepository
  ],
  exports: [DiseaseGroupService]
})
export class DiseaseGroupModule { }
