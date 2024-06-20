import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from 'src/shared';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { SelectorService } from './services/selector.service';
import { ExternalConnectionService } from './services/external-connection.service';
import { MedicalResultListener } from './listeners/medical-result.listener';
import { SelectorController } from './controllers/selector.controller';
import { ExternalKeyModule } from './external-key/external-key.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Exam]),
    ExternalKeyModule,
    AuthenticationGuardModule
  ],
  controllers: [
    SelectorController,
    ExternalConnectionController
  ],
  providers: [
    ExamRepository,
    SelectorService,
    ExternalConnectionService,
    MedicalResultListener
  ]
})
export class ExamModule { }
