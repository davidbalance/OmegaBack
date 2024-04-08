import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Disease } from './entities/disease.entity';
import { DiseaseRepository } from './disease.repository';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule,
    AuthenticationGuardModule
  ],
  controllers: [DiseaseController],
  providers: [
    DiseaseService,
    DiseaseRepository
  ],
  exports: [DiseaseService]
})
export class DiseaseModule { }
