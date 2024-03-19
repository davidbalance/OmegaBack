import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from 'src/shared';
import { CityRepository } from './city.repository';
import { StateModule } from '../state/state.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([City]),
    StateModule
  ],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityService]
})
export class CityModule { }
