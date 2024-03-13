import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Exam } from './entities/exam.entity';
import { ExamRepository } from './exam.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamService, ExamRepository]
})
export class ExamModule { }
