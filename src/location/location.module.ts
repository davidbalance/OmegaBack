import { Module } from '@nestjs/common';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';
import { CorporativeGroupModule } from './corporative-group/corporative-group.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [StateModule, CityModule, CompanyModule, CorporativeGroupModule, BranchModule]
})
export class LocationModule {}
