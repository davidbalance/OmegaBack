import { Module } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { MorbidityGroupController } from './morbidity-group.controller';

@Module({
  controllers: [MorbidityGroupController],
  providers: [MorbidityGroupService]
})
export class MorbidityGroupModule {}
