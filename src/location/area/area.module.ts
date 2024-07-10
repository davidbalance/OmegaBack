import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { SqlDatabaseModule } from '@/shared';
import { Area } from './entities/area.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Area]),
    AuthenticationGuardModule
  ],
  controllers: [
    AreaController
  ],
  providers: [
    AreaService
  ],
  exports: [
    AreaService
  ]
})
export class AreaModule { }
