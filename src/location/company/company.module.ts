import { Module } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CompanyManagementService } from './services/company-management.service';
import { CompanyExternalConnectionController } from './controllers/company-external-connection.controller';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyExternalConnectionProvider, CompanyExternalConnectionService } from './services/company-external-connection.service';
import { CompanyExternalKey } from './entities/company-external-key.entity';
import { CompanyExternalKeyService } from './services/company-external-key.service';
import { CompanyExternalKeyRepository } from './repositories/company-external-key.repository';
import { CompanyPaginationController } from './controllers/company-pagination.controller';
import { CompanyPaginationService } from './services/company-pagination.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Company, CompanyExternalKey]),
    CorporativeGroupModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CompanyExternalConnectionController,
    CompanyPaginationController
  ],
  providers: [
    CompanyManagementService,
    CompanyRepository,
    CompanyExternalKeyService,
    CompanyExternalKeyRepository,
    CompanyExternalConnectionService,
    CompanyPaginationService,
    CompanyExternalConnectionProvider
  ],
  exports: [
    CompanyManagementService,
    CompanyExternalConnectionService,
    CompanyExternalConnectionProvider
  ]
})
export class CompanyModule { }
