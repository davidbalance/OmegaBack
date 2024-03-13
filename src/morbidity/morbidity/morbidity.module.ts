import { Module } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';
import { MorbidityController } from './morbidity.controller';

@Module({
  controllers: [MorbidityController],
  providers: [MorbidityService]
})
export class MorbidityModule {}
