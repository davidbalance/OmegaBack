import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { CityRepository } from './repositories/city.repository';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([CityEntity]),
  ],
  providers: [
    CityRepository,
    CityService,
  ],
  exports: [
    CityService
  ]
})
export class CityModule { }
