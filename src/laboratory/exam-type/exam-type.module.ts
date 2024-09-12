import { Module } from '@nestjs/common';
import { ExamTypeManagementService } from './services/exam-type-management.service';
import { ExamTypeRepository } from './repositories/exam-type.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { ExamTypeExternalConnectionProvider, ExamTypeExternalConnectionService } from './services/exam-type-external-connection.service';
import { ExamTypeExternalConnectionController } from './controllers/exam-type-external-connection.controller';
import { ExamTypeExternalKeyService } from './services/exam-type-external-key.service';
import { ExamTypeExternalKeyRepository } from './repositories/exam-type-external-key.repository';
import { ExamTypePaginationController } from './controllers/exam-type-pagination.controller';
import { ExamTypePaginationService } from './services/exam-type-pagination.service';
import { ExamTypeEntity } from './entities/exam-type.entity';
import { ExamTypeExternalKeyEntity } from './entities/exam-type-external-key.entity';
import { ExamTypeOptionController } from './controllers/exam-type-option.controller';
import { ExamTypeOptionService } from './services/exam-type-option.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      ExamTypeEntity,
      ExamTypeExternalKeyEntity,
    ]),
    AuthenticationGuardModule
  ],
  controllers: [
    ExamTypeExternalConnectionController,
    ExamTypeOptionController,
    ExamTypePaginationController,
  ],
  providers: [
    ExamTypeExternalKeyRepository,
    ExamTypeRepository,
    ExamTypeExternalConnectionService,
    ExamTypeExternalConnectionProvider,
    ExamTypeExternalKeyService,
    ExamTypeManagementService,
    ExamTypeOptionService,
    ExamTypePaginationService
  ],
  exports: [
    ExamTypeManagementService,
    ExamTypeExternalConnectionProvider
  ]
})
export class ExamTypeModule { }
