import { Module } from '@nestjs/common';
import { ExamModule } from './exam/exam.module';
import { ExamTypeModule } from './exam-type/exam-type.module';

@Module({
    imports: [ExamModule, ExamTypeModule]
})
export class LaboratoryModule { }
