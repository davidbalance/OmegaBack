import { Module } from "@nestjs/common";
import { DiseaseCreateCommandProvider } from "./nest/command/disease/disease-create.nest-command";
import { DiseaseEditCommandProvider } from "./nest/command/disease/disease-edit.nest-command";
import { DiseaseGroupCreateCommandProvider } from "./nest/command/disease/disease-group-create.nest-command";
import { DiseaseGroupEditCommandProvider } from "./nest/command/disease/disease-group-edit.nest-command";
import { DiseaseGroupRemoveCommandProvider } from "./nest/command/disease/disease-group-remove.nest-command";
import { DiseaseRemoveCommandProvider } from "./nest/command/disease/disease-remove.nest-command";
import { DiseaseFindManyQueryProvider } from "./nest/query/disease/disease-find-many.nest-query";
import { DiseaseFindOneQueryProvider } from "./nest/query/disease/disease-find-one.nest-query";
import { DiseaseGroupFindManyQueryProvider } from "./nest/query/disease/disease-group-find-many.nest-query";
import { DiseaseGroupFindOptionsQueryProvider } from "./nest/query/disease/disease-group-find-options.nest-query";
import { DiseaseGroupWriteController } from "./controller/write/disease-group-write.controller";
import { DiseaseWriteController } from "./controller/write/disease-write.controller";
import { DiseaseGroupReadController } from "./controller/read/disease-group-read.controller";
import { DiseaseReadController } from "./controller/read/disease-read.controller";
import { DiseaseGroupFindOneQueryProvider } from "./nest/query/disease/disease-group-find-one.nest-query";
import { DiseaseMoveToGroupCommandProvider } from "./nest/command/disease/disease-move-to-group.nest-command";

@Module({
    controllers: [
        DiseaseGroupReadController,
        DiseaseReadController,
        DiseaseGroupWriteController,
        DiseaseWriteController
    ],
    providers: [
        DiseaseMoveToGroupCommandProvider,
        DiseaseCreateCommandProvider,
        DiseaseEditCommandProvider,
        DiseaseRemoveCommandProvider,
        DiseaseGroupCreateCommandProvider,
        DiseaseGroupEditCommandProvider,
        DiseaseGroupRemoveCommandProvider,
        DiseaseFindManyQueryProvider,
        DiseaseFindOneQueryProvider,
        DiseaseGroupFindOneQueryProvider,
        DiseaseGroupFindManyQueryProvider,
        DiseaseGroupFindOptionsQueryProvider,
    ]
})
export class DiseaseModule { }