import { Module } from '@nestjs/common';
import { ExamSubtypeManagementController } from './controllers/exam-subtype-management.controller';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { ExamTypeModule } from '../exam-type/exam-type.module';
import { ExamSubtypeManagementService } from './services/exam-subtype-management.service';
import { ExamSubtypeRepository } from './repositories/exam-subtype.repository';
import { ExamSubtypeExternalConnectionProvider, ExamSubtypeExternalConnectionService } from './services/exam-subtype-external-connection.service';
import { ExamSubtypeExternalConnectionController } from './controllers/exam-subtype-external-connection.controller';
import { ExamSubtypeExternalKeyRepository } from './repositories/exam-subtype-external-key.repository';
import { ExamSubtypeExternalKeyService } from './services/exam-subtype-external-key.service';
import { ExamSubtypePaginationController } from './controllers/exam-subtype-pagination.controller';
import { ExamSubtypePaginationService } from './services/exam-subtype-pagination.service';
import { ExamSubtypeEntity } from './entities/exam-subtype.entity';
import { ExamSubtypeExternalKeyEntity } from './entities/exam-subtype-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      ExamSubtypeEntity,
      ExamSubtypeExternalKeyEntity
    ]),
    AuthenticationGuardModule,
    ExamTypeModule
  ],
  controllers: [
    ExamSubtypeExternalConnectionController,
    ExamSubtypeManagementController,
    ExamSubtypePaginationController
  ],
  providers: [
    ExamSubtypeExternalKeyRepository,
    ExamSubtypeRepository,
    ExamSubtypeExternalConnectionService,
    ExamSubtypeExternalConnectionProvider,
    ExamSubtypeExternalKeyService,
    ExamSubtypeManagementService,
    ExamSubtypePaginationService
  ],
  exports: [
    ExamSubtypeManagementService,
    ExamSubtypeExternalConnectionService,
    ExamSubtypeExternalConnectionProvider
  ]
})
export class ExamSubtypeModule { }
