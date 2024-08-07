import { Module } from '@nestjs/common';
import { ExamTypeManagementService } from './services/exam-type-management.service';
import { ExamTypeManagementController } from './controllers/exam-type-management.controller';
import { ExamTypeRepository } from './repositories/exam-type.repository';
import { ExamType } from './entities/exam-type.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ExamTypeExternalConnectionProvider, ExamTypeExternalConnectionService } from './services/exam-type-external-connection.service';
import { ExamTypeExternalConnectionController } from './controllers/exam-type-external-connection.controller';
import { ExamTypeExternalKeyService } from './services/exam-type-external-key.service';
import { ExamTypeExternalKey } from './entities/exam-type-external-key.entity';
import { ExamTypeExternalKeyRepository } from './repositories/exam-type-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      ExamType,
      ExamTypeExternalKey
    ]),
    AuthenticationGuardModule
  ],
  controllers: [
    ExamTypeExternalConnectionController,
    ExamTypeManagementController,
  ],
  providers: [
    ExamTypeExternalKeyRepository,
    ExamTypeRepository,
    ExamTypeExternalConnectionService,
    ExamTypeExternalKeyService,
    ExamTypeManagementService,
    ExamTypeExternalConnectionProvider
  ],
  exports: [
    ExamTypeManagementService,
    ExamTypeExternalConnectionService,
    ExamTypeExternalConnectionProvider
  ]
})
export class ExamTypeModule { }
