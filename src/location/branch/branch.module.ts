import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { SqlDatabaseModule } from 'src/shared';
import { BranchRepository } from './branch.repository';
import { CompanyModule } from '../company/company.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Branch]),
    CompanyModule,
    CityModule
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService]
})
export class BranchModule { }
