import { Module } from '@nestjs/common';
import { ExamSubtypeManagementController } from './controllers/exam-subtype-management.controller';
import { ExamSubtype } from './entities/exam-subtype.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ExamTypeModule } from '../exam-type/exam-type.module';
import { ExamSubtypeManagementService } from './services/exam-subtype-management.service';
import { ExamSubtypeRepository } from './repositories/exam-subtype.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExamSubtype]),
    AuthenticationGuardModule,
    ExamTypeModule
  ],
  controllers: [
    ExamSubtypeManagementController
  ],
  providers: [
    ExamSubtypeManagementService,
    ExamSubtypeRepository
  ],
  exports: [
    ExamSubtypeManagementService
  ]
})
export class ExamSubtypeModule { }
