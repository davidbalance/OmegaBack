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
import { UserReadController } from "./controller/read/user-read.controller";
import { DoctorReadController } from "./controller/read/doctor-read.controller";
import { DoctorWriteController } from "./controller/write/doctor-write.controller";
import { UserWriteController } from "./controller/write/user-write.controller";
import { CompanyFilterFindManyQueryToken, CorporativeFilterFindManyQueryToken, UserAttributeFindOneQueryToken, UserFindOneByAuthQueryToken } from "./nest/inject/query.inject";
import { UserFindOneByAuthQueryProvider } from "./nest/query/user-find-one-by-auth.nest-query";
import { PatientCreateCommandToken } from "./nest/inject/command.inject";
import { UserAddResourcesCommandProvider } from "./nest/command/user-add-resources.nest-command";
import { UserFindOneQueryProvider } from "./nest/query/user-find-one.nest-query";
import { UserEditCommandProvider } from "./nest/command/user-edit.nest-command";
import { UserFindManyResourcesQueryProvider } from "./nest/query/user-find-many-resources.nest-query";
import { UserEditByDniCommandProvider } from "./nest/command/user-edit-by-dni.nest-command";
import { AddCompanyFilterCommandProvider } from "./nest/command/add-company-filter.nest-command";
import { AddCorporativeFilterCommandProvider } from "./nest/command/add-corporative-filter.nest-command";
import { RemoveCompanyFilterCommandProvider } from "./nest/command/remove-company-filter.nest-command";
import { RemoveCorporativeFilterCommandProvider } from "./nest/command/remove-corporative-filter.nest-command";
import { CompanyFilterFindManyQueryProvider } from "./nest/query/company-filter-find-many.nest-query";
import { CorporativeFilterFindManyQueryProvider } from "./nest/query/corporative-filter-find-many.nest-query";

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
        UserEditByDniCommandProvider,
        UserRemoveAttributeCommandProvider,
        UserRemoveCommandProvider,
        AddCompanyFilterCommandProvider,
        AddCorporativeFilterCommandProvider,
        RemoveCompanyFilterCommandProvider,
        RemoveCorporativeFilterCommandProvider,
        DoctorFindManyQueryProvider,
        DoctorFindOneByDniQueryProvider,
        DoctorFindOneQueryProvider,
        DoctorFindOptionsQueryProvider,
        DoctorGetFileQueryProvider,
        UserFindManyResourcesQueryProvider,
        UserFindOneQueryProvider,
        UserAttributeFindOneQueryProvider,
        UserFindManyQueryProvider,
        UserFindOneByAuthQueryProvider,
        CompanyFilterFindManyQueryProvider,
        CorporativeFilterFindManyQueryProvider
    ],
    exports: [
        UserFindOneByAuthQueryToken,
        UserAttributeFindOneQueryToken,
        PatientCreateCommandToken,
        CompanyFilterFindManyQueryToken,
        CorporativeFilterFindManyQueryToken
    ]
})
export class ProfileModule { }