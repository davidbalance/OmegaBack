import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { CompanyExternalConnectionController } from './controllers/company-external-connection.controller';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyExternalConnectionProvider, CompanyExternalConnectionService } from './services/company-external-connection.service';
import { CompanyExternalKeyService } from './services/company-external-key.service';
import { CompanyExternalKeyRepository } from './repositories/company-external-key.repository';
import { CompanyPaginationController } from './controllers/company-pagination.controller';
import { CompanyPaginationService } from './services/company-pagination.service';
import { CompanyEntity } from './entities/company.entity';
import { CompanyExternalKeyEntity } from './entities/company-external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([
      CompanyEntity,
      CompanyExternalKeyEntity
    ]),
    CorporativeGroupModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CompanyExternalConnectionController,
    CompanyPaginationController
  ],
  providers: [
    CompanyExternalKeyRepository,
    CompanyRepository,
    CompanyExternalConnectionService,
    CompanyExternalConnectionProvider,
    CompanyExternalKeyService,
    CompanyPaginationService,
  ],
  exports: [
    CompanyExternalConnectionService,
    CompanyExternalConnectionProvider
  ]
})
export class CompanyModule { }
