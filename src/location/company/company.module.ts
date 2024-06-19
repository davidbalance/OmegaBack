import { Module } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CompanyRepository } from './company.repository';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ExternalKeyModule } from './external-key/external-key.module';
import { CompanyService } from './services/company.service';
import { ExternalConnectionService } from './services/external-connection.service';
import { ExternalConnectionController } from './controllers/external-connection.controller';
import { SelectorController } from './controllers/selector.controller';
import { SelectorService } from './services/selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Company]),
    ExternalKeyModule,
    CorporativeGroupModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    SelectorController,
    ExternalConnectionController
  ],
  providers: [
    CompanyService,
    SelectorService,
    CompanyRepository,
    ExternalConnectionService
  ],
  exports: [
    CompanyService,
    ExternalConnectionService
  ]
})
export class CompanyModule { }
