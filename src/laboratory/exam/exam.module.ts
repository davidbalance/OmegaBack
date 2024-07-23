import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { SqlDatabaseModule } from "@/shared/sql-database";
import { Module } from "@nestjs/common";
import { ExamExternalConnectionController } from "./controllers/exam-external-connection.controller";
import { ExamSelectorController } from "./controllers/exam-selector.controller";
import { ExamExternalKey } from "./entities/exam-external-key.entity";
import { Exam } from "./entities/exam.entity";
import { MedicalResultExamListener } from "./listeners/medical-result-exam.listener";
import { ExamRepository } from "./repositories/exam.repository";
import { ExamSelectorService } from "./services/exam-selector.service";
import { ExamExternalKeyService } from "./services/exam-external-key.service";
import { ExamExternalConnectionService } from "./services/exam-external-connection.service";
import { ExamExternalKeyRepository } from "./repositories/exam-external-key.repository";
import { ExamSubtypeModule } from "../exam-subtype/exam-subtype.module";
import { ExamTypeModule } from "../exam-type/exam-type.module";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Exam, ExamExternalKey]),
    AuthenticationGuardModule,
    ExamSubtypeModule,
    ExamTypeModule
  ],
  controllers: [
    ExamSelectorController,
    ExamExternalConnectionController
  ],
  providers: [
    ExamRepository,
    ExamSelectorService,
    MedicalResultExamListener,
    ExamExternalKeyService,
    ExamExternalKeyRepository,
    ExamExternalConnectionService
  ]
})
export class ExamModule { }
