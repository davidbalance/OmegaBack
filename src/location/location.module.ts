import { Module } from "@nestjs/common";
import { AreaCreateCommandProvider } from "./nest/command/area/area-create.nest-command";
import { AreaEditCommandProvider } from "./nest/command/area/area-edit.nest-command";
import { AreaRemoveCommandProvider } from "./nest/command/area/area-remove.nest-command";
import { BranchCreateCommandProvider } from "./nest/command/corporative/branch-create.nest-command";
import { BranchRemoveCommandProvider } from "./nest/command/corporative/branch-remove.nest-command";
import { CompanyCreateCommandProvider } from "./nest/command/corporative/company-create.nest-command";
import { CompanyRemoveCommandProvider } from "./nest/command/corporative/company-remove.nest-command";
import { CorporativeCreateCommandProvider } from "./nest/command/corporative/corporative-create.nest-command";
import { CorporativeRemoveCommandProvider } from "./nest/command/corporative/corporative-remove.nest-command";
import { JobPositionCreateCommandProvider } from "./nest/command/jobPosition/job-position-create.nest-command";
import { JobPositionEditCommandProvider } from "./nest/command/jobPosition/job-position-edit.nest-command";
import { JobPositionRemoveCommandProvider } from "./nest/command/jobPosition/job-position-remove.nest-command";
import { ManagementCreateCommandProvider } from "./nest/command/management/management-create.nest-command";
import { ManagementEditCommandProvider } from "./nest/command/management/management-edit.nest-command";
import { ManagementRemoveCommandProvider } from "./nest/command/management/management-remove.nest-command";
import { AreaFindManyQueryProvider } from "./nest/query/area/area-find-many.nest-query";
import { AreaFindOneQueryProvider } from "./nest/query/area/area-find-one.nest-query";
import { AreaFindOptionsQueryProvider } from "./nest/query/area/area-find-options.nest-query";
import { BranchFindManyQueryProvider } from "./nest/query/corporative/branch-find-many.nest-query";
import { CompanyFindManyQueryProvider } from "./nest/query/corporative/company-find-many.nest-query";
import { CorporativeFindManyQueryProvider } from "./nest/query/corporative/corporative-find-many.nest-query";
import { CorporativeFindOptionsQueryProvider } from "./nest/query/corporative/corporative-find-options.nest-query";
import { JobPositionFindManyQueryProvider } from "./nest/query/jobPosition/job-position-find-many.nest-query";
import { JobPositionFindOneQueryProvider } from "./nest/query/jobPosition/job-position-find-one.nest-query";
import { JobPositionFindOptionsQueryProvider } from "./nest/query/jobPosition/job-position-find-options.nest-query";
import { ManagementFindManyQueryProvider } from "./nest/query/management/management-find-many.nest-query";
import { ManagementFindOneByNameQueryProvider } from "./nest/query/management/management-find-one-by-name.nest-query";
import { ManagementFindOneQueryProvider } from "./nest/query/management/management-find-one.nest-query";
import { ManagementFindOptionsQueryProvider } from "./nest/query/management/management-find-options.nest-query";
import { AreaReadController } from "./controller/read/area_read.controller";
import { BranchReadController } from "./controller/read/branch_read.controller";
import { CompanyReadController } from "./controller/read/company_read.controller";
import { CorporativeReadController } from "./controller/read/corporative_read.controller";
import { JobPositionReadController } from "./controller/read/job_position_read.controller";
import { ManagementReadController } from "./controller/read/management_read.controller";
import { AreaWriteController } from "./controller/write/area_write.controller";
import { ManagementWriteController } from "./controller/write/management_write.controller";
import { CompanyMoveCommandProvider } from "./nest/command/corporative/company_move.nest_command";
import { BranchMoveCommandProvider } from "./nest/command/corporative/branch_move.nest_command";
import { CorporativeWriteController } from "./controller/write/corporative-write.controller";
import { CompanyWriteController } from "./controller/write/company-write.controller";
import { BranchWriteController } from "./controller/write/branch-write.controller";
import { BranchFindOneByExternalKeyQueryProvider } from "./nest/query/corporative/branch-find-one-by-external-key.nest-query";
import { CompanyFindOneByExternalKeyQueryProvider } from "./nest/query/corporative/company-find-one-by-external-key.nest-query";
import { CorporativeFindOneByExternalKeyQueryProvider } from "./nest/query/corporative/corporative-find-one-by-external-key.nest-query";
import { CorporativeCreateFromExternalSourceCommandProvider } from "./nest/command/corporative/corporative-create-from-external-source.nest-command";
import { CompanyCreateFromExternalSourceCommandProvider } from "./nest/command/corporative/company-create-from-external-source.nest-command";
import { BranchCreateFromExternalSourceCommandProvider } from "./nest/command/corporative/branch-create-from-external-source.nest-command";
import { CreateBranchFromExternalSourceServiceProvider } from "./nest/service/create-branch-from-external-source.nest-service";
import { CreateCompanyFromExternalSourceServiceProvider } from "./nest/service/create-company-from-external-source.nest-service";
import { CreateCorporativeFromExternalSourceServiceProvider } from "./nest/service/create-corporative-from-external-source.nest-service";
import { BranchExternalSourceResolverProvider } from "./nest/resolver/branch-external-source.nest-resolver";
import { CompanyExternalSourceResolverProvider } from "./nest/resolver/company-external-source.nest-resolver";
import { CorporativeExternalSourceResolverProvider } from "./nest/resolver/corporative-external-source.nest-resolver";

@Module({
    controllers: [
        AreaReadController,
        BranchReadController,
        CompanyReadController,
        CorporativeReadController,
        JobPositionReadController,
        ManagementReadController,
        AreaWriteController,
        ManagementWriteController,
        CorporativeWriteController,
        CompanyWriteController,
        BranchWriteController
    ],
    providers: [
        BranchExternalSourceResolverProvider,
        CompanyExternalSourceResolverProvider,
        CorporativeExternalSourceResolverProvider,

        CreateBranchFromExternalSourceServiceProvider,
        CreateCompanyFromExternalSourceServiceProvider,
        CreateCorporativeFromExternalSourceServiceProvider,

        AreaCreateCommandProvider,
        AreaEditCommandProvider,
        AreaRemoveCommandProvider,
        BranchMoveCommandProvider,
        BranchCreateFromExternalSourceCommandProvider,
        BranchCreateCommandProvider,
        BranchRemoveCommandProvider,
        CompanyMoveCommandProvider,
        CompanyCreateFromExternalSourceCommandProvider,
        CompanyCreateCommandProvider,
        CompanyRemoveCommandProvider,
        CorporativeCreateFromExternalSourceCommandProvider,
        CorporativeCreateCommandProvider,
        CorporativeRemoveCommandProvider,
        JobPositionCreateCommandProvider,
        JobPositionEditCommandProvider,
        JobPositionRemoveCommandProvider,
        ManagementCreateCommandProvider,
        ManagementEditCommandProvider,
        ManagementRemoveCommandProvider,
        AreaFindManyQueryProvider,
        AreaFindOneQueryProvider,
        AreaFindOptionsQueryProvider,
        BranchFindManyQueryProvider,
        BranchFindOneByExternalKeyQueryProvider,
        CompanyFindManyQueryProvider,
        CompanyFindOneByExternalKeyQueryProvider,
        CorporativeFindManyQueryProvider,
        CorporativeFindOneByExternalKeyQueryProvider,
        CorporativeFindOptionsQueryProvider,
        JobPositionFindManyQueryProvider,
        JobPositionFindOneQueryProvider,
        JobPositionFindOptionsQueryProvider,
        ManagementFindManyQueryProvider,
        ManagementFindOneByNameQueryProvider,
        ManagementFindOneQueryProvider,
        ManagementFindOptionsQueryProvider
    ]
})
export class LocationModule { }