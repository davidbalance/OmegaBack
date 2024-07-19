import { Module } from '@nestjs/common';
import { ExamModule } from './exam/exam.module';
import { ExamTypeModule } from './exam-type/exam-type.module';
import { ExamSubtypeModule } from './exam-subtype/exam-subtype.module';

@Module({
    imports: [ExamModule, ExamTypeModule, ExamSubtypeModule]
})
export class LaboratoryModule { }
