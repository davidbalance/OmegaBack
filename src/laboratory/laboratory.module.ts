import { Module } from "@nestjs/common";
import { ExamCreateCommandProvider } from "./nest/command/exam-create.nest-command";
import { ExamEditCommandProvider } from "./nest/command/exam-edit.nest-command";
import { ExamRemoveCommandProvider } from "./nest/command/exam-remove.nest-command";
import { ExamSubtypeCreateCommandProvider } from "./nest/command/exam-subtype-create.nest-command";
import { ExamSubtypeEditCommandProvider } from "./nest/command/exam-subtype-edit.nest-command";
import { ExamSubtypeRemoveCommandProvider } from "./nest/command/exam-subtype-remove.nest-command";
import { ExamTypeCreateCommandProvider } from "./nest/command/exam-type-create.nest-command";
import { ExamTypeEditCommandProvider } from "./nest/command/exam-type-edit.nest-command";
import { ExamTypeRemoveCommandProvider } from "./nest/command/exam-type-remove.nest-command";
import { ExamFindManyQueryProvider } from "./nest/query/exam-find-many.nest-query";
import { ExamFindOneQueryProvider } from "./nest/query/exam-find-one.nest-query";
import { ExamSubtypeFindManyQueryProvider } from "./nest/query/exam-subtype-find-many.nest-query";
import { ExamSubtypeFindOneQueryProvider } from "./nest/query/exam-subtype-find-one.nest-query";
import { ExamTypeFindManyQueryProvider } from "./nest/query/exam-type-find-many.nest-query";
import { ExamTypeFindOneQueryProvider } from "./nest/query/exam-type-find-one.nest-query";
import { ExamTypeFindOptionsQueryProvider } from "./nest/query/exam-type-find-options.nest-query";
import { ExamReadController } from "./controller/read/exam_read.controller";
import { ExamSubtypeReadController } from "./controller/read/exam_subtype_read.controller";
import { ExamTypeReadController } from "./controller/read/exam_type_read.controller";
import { ExamWriteController } from "./controller/write/exam_write.controller";
import { ExamSubtypeWriteController } from "./controller/write/exam_subtype_write.controller";
import { ExamSubtypeMoveCommandProvider } from "./nest/command/exam_subtype_move.nest_command";
import { ExamMoveCommandProvider } from "./nest/command/exam_move.nest_command";
import { ExamTypeFindOptionsQueryToken } from "./nest/inject/query.inject";
import { ExamFindOneByExternalKeyQueryProvider } from "./nest/query/exam-find-one-by-external-key.nest-query";
import { ExamSubtypeFindOneByExternalKeyQueryProvider } from "./nest/query/exam-subtype-find-one-by-external-key.nest-query";
import { ExamTypeFindOneByExternalKeyQueryProvider } from "./nest/query/exam-type-find-one-by-external-key.nest-query";
import { ExamCreateFromExternalSourceCommandProvider } from "./nest/command/exam-create-from-external-source.nest-command";
import { ExamSubtypeCreateFromExternalSourceCommandProvider } from "./nest/command/exam-subtype-create-from-external-source.nest-command";
import { ExamTypeCreateFromExternalSourceCommandProvider } from "./nest/command/exam-type-create-from-external-source.nest-command";

@Module({
    controllers: [
        ExamReadController,
        ExamSubtypeReadController,
        ExamTypeReadController,
        ExamWriteController,
        ExamSubtypeWriteController
    ],
    providers: [
        ExamMoveCommandProvider,
        ExamSubtypeMoveCommandProvider,
        ExamCreateFromExternalSourceCommandProvider,
        ExamCreateCommandProvider,
        ExamEditCommandProvider,
        ExamRemoveCommandProvider,
        ExamSubtypeCreateFromExternalSourceCommandProvider,
        ExamSubtypeCreateCommandProvider,
        ExamSubtypeEditCommandProvider,
        ExamSubtypeRemoveCommandProvider,
        ExamTypeCreateFromExternalSourceCommandProvider,
        ExamTypeCreateCommandProvider,
        ExamTypeEditCommandProvider,
        ExamTypeRemoveCommandProvider,
        ExamFindManyQueryProvider,
        ExamFindOneByExternalKeyQueryProvider,
        ExamFindOneQueryProvider,
        ExamSubtypeFindManyQueryProvider,
        ExamSubtypeFindOneByExternalKeyQueryProvider,
        ExamSubtypeFindOneQueryProvider,
        ExamTypeFindManyQueryProvider,
        ExamTypeFindOneByExternalKeyQueryProvider,
        ExamTypeFindOneQueryProvider,
        ExamTypeFindOptionsQueryProvider,
    ],
    exports: [ExamTypeFindOptionsQueryToken]
})
export class LaboratoryModule { }