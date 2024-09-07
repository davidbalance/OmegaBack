import { Module } from '@nestjs/common';
import { JobPositionRepository } from './repositories/job-position.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { JobPositionExternalKeyRepository } from './repositories/job-position-external-key.repository';
import { JobPositionExternalConnectionService } from './services/job-position-external-connection.service';
import { JobPositionExternalConnectionController } from './controllers/job-position-external-connection.controller';
import { JobPositionExternalKeyService } from './services/job-position-external-key.service';
import { JobPositionExternalListener } from './listeners/job-position-external.listener';
import { JobPositionPaginationController } from './controllers/job-position-pagination.controller';
import { JobPositionPaginationService } from './services/job-position-pagination.service';
import { JobPositionEntity } from './entities/job-position.entity';
import { JobPositionExternalKeyEntity } from './entities/job-position-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      JobPositionEntity,
      JobPositionExternalKeyEntity
    ]),
    AuthenticationGuardModule
  ],
  controllers: [
    JobPositionPaginationController,
    JobPositionExternalConnectionController
  ],
  providers: [
    JobPositionExternalKeyRepository,
    JobPositionRepository,
    JobPositionExternalListener,
    JobPositionExternalConnectionService,
    JobPositionExternalKeyService,
    JobPositionPaginationService
  ],
  exports: []
})
export class JobPositionModule { }
