import { Module } from '@nestjs/common';
import { JobPositionManagementController } from './controllers/job-position-management.controller';
import { JobPositionManagementService } from './services/job-position-management.service';
import { JobPositionRepository } from './repositories/job-position.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { JobPosition } from './entities/job-position.entity';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { JobPositionExternalKey } from './entities/job-position-external-key.entity';
import { JobPositionExternalKeyRepository } from './repositories/job-position-external-key.repository';
import { JobPositionExternalConnectionService } from './services/job-position-external-connection.service';
import { JobPositionExternalConnectionController } from './controllers/job-position-external-connection.controller';
import { JobPositionExternalKeyService } from './services/job-position-external-key.service';
import { JobPositionExternalListener } from './listeners/job-position-external.listener';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([JobPosition, JobPositionExternalKey]),
    AuthenticationGuardModule
  ],
  controllers: [
    JobPositionManagementController,
    JobPositionExternalConnectionController
  ],
  providers: [
    JobPositionRepository,
    JobPositionExternalKeyRepository,
    JobPositionExternalConnectionService,
    JobPositionExternalKeyService,
    JobPositionManagementService,
    JobPositionExternalListener
  ],
  exports: [
    JobPositionManagementService
  ]
})
export class JobPositionModule { }
