import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { CityRepository } from './city.repository';
import { SelectorController } from './controllers/selector.controller';
import { CitySelectorService } from './services/city-selector.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([City]),
  ],
  controllers: [
    SelectorController
  ],
  providers: [
    CityService,
    CityRepository,
    CitySelectorService,
  ],
  exports: [CityService]
})
export class CityModule { }
