import { Module } from '@nestjs/common';
import { ExamExternalKeyService } from './exam-external-key.service';
import { SqlDatabaseModule } from '@/shared';
import { ExamExternalKey } from './entities/exam-external-key.entity';
import { ExamExternalKeyRepository } from './exam-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExamExternalKey])
  ],
  providers: [
    ExamExternalKeyService,
    ExamExternalKeyRepository
  ],
  exports: [ExamExternalKeyService]
})
export class ExamExternalKeyModule { }
