import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CityRepository } from './repositories/city.repository';
import { CitySelectorController } from './controllers/city-selector.controller';
import { CitySelectorService } from './services/city-selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([City]),
  ],
  controllers: [
    CitySelectorController
  ],
  providers: [
    CityService,
    CityRepository,
    CitySelectorService,
  ],
  exports: [
    CityService
  ]
})
export class CityModule { }
