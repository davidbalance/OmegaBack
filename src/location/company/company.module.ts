import { Module } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CompanyManagementService } from './services/company-management.service';
import { CompanyExternalConnectionController } from './controllers/company-external-connection.controller';
import { CompanySelectorController } from './controllers/company-selector.controller';
import { CompanySelectorService } from './services/company-selector.service';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyExternalConnectionProvider, CompanyExternalConnectionService } from './services/company-external-connection.service';
import { CompanyExternalKey } from './entities/company-external-key.entity';
import { CompanyExternalKeyService } from './services/company-external-key.service';
import { CompanyExternalKeyRepository } from './repositories/company-external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Company, CompanyExternalKey]),
    CorporativeGroupModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CompanySelectorController,
    CompanyExternalConnectionController
  ],
  providers: [
    CompanyManagementService,
    CompanySelectorService,
    CompanyRepository,
    CompanyExternalKeyService,
    CompanyExternalKeyRepository,
    CompanyExternalConnectionService,
    CompanyExternalConnectionProvider
  ],
  exports: [
    CompanyManagementService,
    CompanyExternalConnectionService,
    CompanyExternalConnectionProvider
  ]
})
export class CompanyModule { }
