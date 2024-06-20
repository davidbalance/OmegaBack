import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CityRepository } from './city.repository';
import { SelectorController } from './controllers/selector.controller';
import { SelectorService } from './services/selector.service';

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
    SelectorService,
  ],
  exports: [CityService]
})
export class CityModule { }
