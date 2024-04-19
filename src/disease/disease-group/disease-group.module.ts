import { Module } from '@nestjs/common';
import { DiseaseGroupService } from './disease-group.service';
import { DiseaseGroupController } from './disease-group.controller';
import { DiseaseGroup } from './entities/disease-group.entity';
import { SqlDatabaseModule } from 'src/shared';
import { DiseaseGroupRepository } from './disease-group.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([DiseaseGroup]),
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [DiseaseGroupController],
  providers: [
    DiseaseGroupService,
    DiseaseGroupRepository,
    AuthorizationGuard
  ],
  exports: [DiseaseGroupService]
})
export class DiseaseGroupModule { }
