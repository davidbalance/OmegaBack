import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { SqlDatabaseModule } from 'src/shared';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [
    ExamService,
    ExamRepository
  ],
  exports: [ExamService]
})
export class ExamModule { }
