import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CompanyRepository } from './company.repository';
import { CompanyExternalConnectionService } from './external-connection/company-external-connection.service';
import { CompanyExternalConnectionController } from './external-connection/company-external-connection.controller';
import { CompanyExternalKeyModule } from './company-external-key/company-external-key.module';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Company]),
    CompanyExternalKeyModule,
    CorporativeGroupModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    CompanyController,
    CompanyExternalConnectionController
  ],
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyExternalConnectionService,
  ],
  exports: [
    CompanyService,
    CompanyExternalConnectionService
  ]
})
export class CompanyModule { }
