import { Module } from '@nestjs/common';
import { ExamSubtypeManagementController } from './controllers/exam-subtype-management.controller';
import { ExamSubtype } from './entities/exam-subtype.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { ExamTypeModule } from '../exam-type/exam-type.module';
import { ExamSubtypeManagementService } from './services/exam-subtype-management.service';
import { ExamSubtypeRepository } from './repositories/exam-subtype.repository';
import { ExamSubtypeExternalConnectionProvider, ExamSubtypeExternalConnectionService } from './services/exam-subtype-external-connection.service';
import { ExamSubtypeExternalConnectionController } from './controllers/exam-subtype-external-connection.controller';
import { ExamSubtypeExternalKey } from './entities/exam-subtype-external-key.entity';
import { ExamSubtypeExternalKeyRepository } from './repositories/exam-subtype-external-key.repository';
import { ExamSubtypeExternalKeyService } from './services/exam-subtype-external-key.service';
import { ExamSubtypePaginationController } from './controllers/exam-subtype-pagination.controller';
import { ExamSubtypePaginationService } from './services/exam-subtype-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      ExamSubtype,
      ExamSubtypeExternalKey
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
    ExamSubtypeExternalKeyService,
    ExamSubtypeManagementService,
    ExamSubtypeExternalConnectionProvider,
    ExamSubtypePaginationService
  ],
  exports: [
    ExamSubtypeManagementService,
    ExamSubtypeExternalConnectionService,
    ExamSubtypeExternalConnectionProvider
  ]
})
export class ExamSubtypeModule { }
