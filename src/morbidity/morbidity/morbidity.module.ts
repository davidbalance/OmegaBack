import { Module } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import { MorbidityController } from './morbidity.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Morbidity } from './entities/morbidity.entity';
import { MorbidityRepository } from './morbidity.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([Morbidity])],
  controllers: [MorbidityController],
  providers: [MorbidityService, MorbidityRepository],
  exports: [MorbidityService]
})
export class MorbidityModule { }
