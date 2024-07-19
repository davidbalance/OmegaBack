import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { CompanyModule } from './company/company.module';
import { CorporativeGroupModule } from './corporative-group/corporative-group.module';
import { BranchModule } from './branch/branch.module';
import { ManagementModule } from './management/management.module';
import { AreaModule } from './area/area.module';
import { JobPositionModule } from './job-position/job-position.module';

@Module({
  imports: [
    CityModule,
    CompanyModule,
    CorporativeGroupModule,
    BranchModule,
    ManagementModule,
    AreaModule,
    JobPositionModule
  ]
})
export class LocationModule { }
