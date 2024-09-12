import { Module } from "@nestjs/common";
import { BranchExternalConnectionProvider, BranchExternalConnectionService } from "./services/branch-external-connection.service";
import { BranchRepository } from "./repositories/branch.repository";
import { BranchExternalConnectionController } from "./controllers/branch-external-connection.controller";
import { AuthenticationGuardModule } from "@/shared/guards/authentication-guard";
import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { CityModule } from "../city/city.module";
import { CompanyModule } from "../company/company.module";
import { BranchExternalKeyService } from "./services/branch-external-key.service";
import { BranchExternalKeyRepository } from "./repositories/branch-external-key.repository";
import { BranchExternalListener } from "./listeners/branch-external.listener";
import { BranchPaginationController } from "./controllers/branch-pagination.controller";
import { BranchPaginationService } from "./services/branch-pagination.service";
import { BranchEntity } from "./entities/branch.entity";
import { BranchExternalKeyEntity } from "./entities/branch-external-key.entity";

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      BranchEntity,
      BranchExternalKeyEntity
    ]),
    CompanyModule,
    CityModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    BranchExternalConnectionController,
    BranchPaginationController
  ],
  providers: [
    BranchExternalKeyRepository,
    BranchRepository,
    BranchExternalListener,
    BranchExternalConnectionService,
    BranchExternalConnectionProvider,
    BranchExternalKeyService,
    BranchPaginationService,
  ],
  exports: [
    BranchExternalConnectionProvider
  ]
})
export class BranchModule { }
