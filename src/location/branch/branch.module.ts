import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { SqlDatabaseModule } from 'src/shared';
import { BranchRepository } from './branch.repository';
import { BranchExternalKeyModule } from './branch-external-key/branch-external-key.module';
import { BranchExternalConnectionController } from './external-connection/branch-external-connection.controller';
import { BranchExternalConnectionService } from './external-connection/branch-external-connection.service';
import { CompanyModule } from '../company/company.module';
import { CityModule } from '../city/city.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Branch]),
    BranchExternalKeyModule,
    CompanyModule,
    CityModule,
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [
    BranchController,
    BranchExternalConnectionController,
  ],
  providers: [
    BranchService,
    BranchRepository,
    BranchExternalConnectionService,
    AuthorizationGuard
  ],
  exports: [BranchService, BranchExternalConnectionService]
})
export class BranchModule { }
