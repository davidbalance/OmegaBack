import { Module } from '@nestjs/common';
import { JobPositionManagementController } from './controllers/job-position-management.controller';
import { JobPositionManagementService } from './services/job-position-management.service';
import { JobPositionRepository } from './repositories/job-position.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { JobPosition } from './entities/job-position.entity';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { JobPositionExternalKey } from './entities/job-position-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([JobPosition, JobPositionExternalKey]),
    AuthenticationGuardModule
  ],
  controllers: [
    JobPositionManagementController
  ],
  providers: [
    JobPositionManagementService,
    JobPositionRepository
  ],
  exports: [
    JobPositionManagementService
  ]
})
export class JobPositionModule { }
