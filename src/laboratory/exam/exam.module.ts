import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { Module } from "@nestjs/common";
import { ExamExternalConnectionController } from "./controllers/exam-external-connection.controller";
import { ExamExternalListener } from "./listeners/exam-external.listener";
import { ExamRepository } from "./repositories/exam.repository";
import { ExamExternalKeyService } from "./services/exam-external-key.service";
import { ExamExternalConnectionService } from "./services/exam-external-connection.service";
import { ExamExternalKeyRepository } from "./repositories/exam-external-key.repository";
import { ExamSubtypeModule } from "../exam-subtype/exam-subtype.module";
import { ExamTypeModule } from "../exam-type/exam-type.module";
import { ExamManagementService } from "./services/exam-management.service";
import { ExamManagementController } from "./controllers/exam-management.controller";
import { ExamPaginationController } from "./controllers/exam-pagination.controller";
import { ExamPaginationService } from "./services/exam-pagination.service";
import { ExamEntity } from "./entities/exam.entity";
import { ExamExternalKeyEntity } from "./entities/exam-external-key.entity";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      ExamEntity,
      ExamExternalKeyEntity
    ]),
    AuthenticationGuardModule,
    ExamSubtypeModule,
    ExamTypeModule
  ],
  controllers: [
    ExamExternalConnectionController,
    ExamManagementController,
    ExamPaginationController
  ],
  providers: [
    ExamExternalKeyRepository,
    ExamRepository,
    ExamExternalConnectionService,
    ExamExternalKeyService,
    ExamManagementService,
    ExamPaginationService,
    ExamExternalListener,
  ]
})
export class ExamModule { }
