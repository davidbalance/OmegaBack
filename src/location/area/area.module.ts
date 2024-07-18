import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Area } from './entities/area.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ManagementModule } from '../management/management.module';
import { AreaRepository } from './area.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Area]),
    AuthenticationGuardModule,
    ManagementModule
  ],
  controllers: [
    AreaController
  ],
  providers: [
    AreaService,
    AreaRepository
  ],
  exports: [
    AreaService
  ]
})
export class AreaModule { }
