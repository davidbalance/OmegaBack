import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { SqlDatabaseModule } from 'src/shared';

@Module({
  imports: [SqlDatabaseModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }
