import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { SqlDatabaseModule } from 'src/shared';

@Module({
  imports: [SqlDatabaseModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule { }
