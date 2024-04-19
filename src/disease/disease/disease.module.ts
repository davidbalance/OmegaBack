import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Disease } from './entities/disease.entity';
import { DiseaseRepository } from './disease.repository';
import { DiseaseGroupModule } from '../disease-group/disease-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Disease]),
    DiseaseGroupModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [DiseaseController],
  providers: [
    DiseaseService,
    DiseaseRepository,
    AuthorizationGuard
  ],
  exports: [DiseaseService]
})
export class DiseaseModule { }
