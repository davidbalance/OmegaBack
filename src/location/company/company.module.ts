import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CompanyRepository } from './company.repository';
import { CorporativeGroupModule } from '../corporative-group/corporative-group.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Company]),
    CorporativeGroupModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService]
})
export class CompanyModule { }
