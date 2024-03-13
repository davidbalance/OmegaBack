import { Module } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import { MorbidityController } from './morbidity.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Morbidity } from './entities/morbidity.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([Morbidity])],
  controllers: [MorbidityController],
  providers: [MorbidityService]
})
export class MorbidityModule { }
