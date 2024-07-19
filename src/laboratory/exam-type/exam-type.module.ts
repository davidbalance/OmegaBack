import { Module } from '@nestjs/common';
import { ExamTypeManagementService } from './services/exam-type-management.service';
import { ExamTypeManagementController } from './controllers/exam-type-management.controller';
import { ExamTypeRepository } from './repositories/exam-type.repository';
import { ExamType } from './entities/exam-type.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExamType]),
    AuthenticationGuardModule
  ],
  controllers: [
    ExamTypeManagementController
  ],
  providers: [
    ExamTypeManagementService,
    ExamTypeRepository
  ],
  exports: [
    ExamTypeManagementService
  ]
})
export class ExamTypeModule { }
