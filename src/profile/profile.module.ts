import { Module } from "@nestjs/common";
import { DoctorCreateCommandProvider } from "./nest/command/doctor-create.nest-command";
import { DoctorUploadFileCommandProvider } from "./nest/command/doctor-upload-file.nest-command";
import { PatientCreateCommandProvider } from "./nest/command/patient-create.nest-command";
import { UserAddAttributeCommandProvider } from "./nest/command/user-add-attribute.nest-command";
import { UserAddAuthCommandProvider } from "./nest/command/user-add-auth.nest-command";
import { UserCreateCommandProvider } from "./nest/command/user-create.nest-command";
import { UserRemoveAttributeCommandProvider } from "./nest/command/user-remove-attribute.nest-command";
import { UserRemoveCommandProvider } from "./nest/command/user-remove.nest-command";
import { DoctorFindManyQueryProvider } from "./nest/query/doctor-find-many.nest-query";
import { DoctorFindOneByDniQueryProvider } from "./nest/query/doctor-find-one-by-dni.nest-query";
import { DoctorFindOneQueryProvider } from "./nest/query/doctor-find-one.nest-query";
import { DoctorFindOptionsQueryProvider } from "./nest/query/doctor-find-options.nest-query";
import { DoctorGetFileQueryProvider } from "./nest/query/doctor-get-file.nest-query";
import { UserAttributeFindOneQueryProvider } from "./nest/query/user-attribute-find-one.nest-query";
import { UserFindManyQueryProvider } from "./nest/query/user-find-many.nest-query";
import { LocalFileModule } from "local-file/local-file";
import { UserReadController } from "./controller/read/user_read.controller";
import { DoctorReadController } from "./controller/read/doctor_read.controller";
import { DoctorWriteController } from "./controller/write/doctor-write.controller";
import { UserWriteController } from "./controller/write/user-write.controller";
import { UserAttributeFindOneQueryToken, UserFindOneByAuthQueryToken } from "./nest/inject/query.inject";
import { UserFindOneByAuthQueryProvider } from "./nest/query/user-find-one-by-auth.nest-query";
import { PatientCreateCommandToken } from "./nest/inject/command.inject";
import { UserAddResourcesCommandProvider } from "./nest/command/user_add_resources.nest_command";
import { UserFindOneQueryProvider } from "./nest/query/user-find-one.nest-query";
import { UserEditCommandProvider } from "./nest/command/user_edit.nest_command";
import { UserFindManyResourcesQueryProvider } from "./nest/query/user-find-many-resources.nest-query";

@Module({
    imports: [
        LocalFileModule
    ],
    controllers: [
        UserReadController,
        DoctorReadController,
        UserWriteController,
        DoctorWriteController
    ],
    providers: [
        DoctorCreateCommandProvider,
        DoctorUploadFileCommandProvider,
        PatientCreateCommandProvider,
        UserAddResourcesCommandProvider,
        UserAddAttributeCommandProvider,
        UserAddAuthCommandProvider,
        UserCreateCommandProvider,
        UserEditCommandProvider,
        UserRemoveAttributeCommandProvider,
        UserRemoveCommandProvider,
        DoctorFindManyQueryProvider,
        DoctorFindOneByDniQueryProvider,
        DoctorFindOneQueryProvider,
        DoctorFindOptionsQueryProvider,
        DoctorGetFileQueryProvider,
        UserFindManyResourcesQueryProvider,
        UserFindOneQueryProvider,
        UserAttributeFindOneQueryProvider,
        UserFindManyQueryProvider,
        UserFindOneByAuthQueryProvider
    ],
    exports: [
        UserFindOneByAuthQueryToken,
        UserAttributeFindOneQueryToken,
        PatientCreateCommandToken
    ]
})
export class ProfileModule { }