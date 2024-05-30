import { Module } from '@nestjs/common';
import { HealthStatusController } from './health-status.controller';

@Module({
  controllers: [HealthStatusController]
})
export class HealthStatusModule {}
