import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CityRepository } from './city.repository';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([City]),
    LocalAuthorizationModule
  ],
  controllers: [CityController],
  providers: [
    CityService,
    CityRepository,
    AuthorizationGuard
  ],
  exports: [CityService]
})
export class CityModule { }
