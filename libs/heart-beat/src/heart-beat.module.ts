import { Module } from '@nestjs/common';
import { HeartBeatController } from './heart-beat.controller';

@Module({
  controllers: [HeartBeatController]
})
export class HeartBeatModule { }
