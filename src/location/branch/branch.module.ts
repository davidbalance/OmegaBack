import { Module } from '@nestjs/common';
import { Branch } from './entities/branch.entity';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { BranchRepository } from './branch.repository';
import { CompanyModule } from '../company/company.module';
import { CityModule } from '../city/city.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SelectorController } from './controllers/selector.controller';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { BranchService } from './services/branch.service';
import { ExternalConnectionService } from './services/external-connection.service';
import { ExternalKeyModule } from './external-key/external-key.module';
import { SelectorService } from './services/selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Branch]),
    ExternalKeyModule,
    CompanyModule,
    CityModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    SelectorController,
    ExternalConnectionController,
  ],
  providers: [
    BranchService,
    BranchRepository,
    ExternalConnectionService,
    SelectorService
  ],
  exports: [
    BranchService
  ]
})
export class BranchModule { }
