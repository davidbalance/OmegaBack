import { Module } from "@nestjs/common";
import { BranchManagementService } from "./services/branch-management.service";
import { BranchExternalConnectionProvider, BranchExternalConnectionService } from "./services/branch-external-connection.service";
import { BranchSelectorService } from "./services/branch-selector.service";
import { BranchRepository } from "./repositories/branch.repository";
import { BranchSelectorController } from "./controllers/branch-selector.controller";
import { BranchExternalConnectionController } from "./controllers/branch-external-connection.controller";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { SqlDatabaseModule } from "@/shared/sql-database";
import { CityModule } from "../city/city.module";
import { CompanyModule } from "../company/company.module";
import { BranchExternalKey } from "./entities/branch-external-key.entity";
import { Branch } from "./entities/branch.entity";
import { BranchExternalKeyService } from "./services/branch-external-key.service";
import { BranchExternalKeyRepository } from "./repositories/branch-external-key.repository";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Branch, BranchExternalKey]),
    CompanyModule,
    CityModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    BranchSelectorController,
    BranchExternalConnectionController,
  ],
  providers: [
    BranchRepository,
    BranchExternalKeyRepository,
    BranchSelectorService,
    BranchManagementService,
    BranchExternalKeyService,
    BranchExternalConnectionService,
    BranchExternalConnectionProvider
  ],
  exports: [
    BranchManagementService,
    BranchExternalConnectionProvider
  ]
})
export class BranchModule { }
