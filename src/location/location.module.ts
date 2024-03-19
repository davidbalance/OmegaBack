import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';
import { CorporativeGroupModule } from './corporative-group/corporative-group.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [CityModule, CompanyModule, CorporativeGroupModule, BranchModule]
})
export class LocationModule { }
