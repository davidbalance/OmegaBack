import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';
import { ExamExternalKeyModule } from './exam-external-key/exam-external-key.module';
import { ExamExternalConnectionController } from './external-connections/exam-external-connection.controller';
import { ExamExternalConnectionService } from './external-connections/exam-external-connection.service';
import { ResultListener } from './listeners';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Exam]),
    ExamExternalKeyModule
  ],
  controllers: [
    ExamController,
    ExamExternalConnectionController
  ],
  providers: [
    ExamService,
    ExamRepository,
    ExamExternalConnectionService,
    ResultListener
  ],
  exports: [ExamService]
})
export class ExamModule { }
