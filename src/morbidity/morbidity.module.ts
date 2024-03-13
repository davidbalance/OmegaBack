import { Module } from '@nestjs/common';
import { MorbidityModule } from './morbidity/morbidity.module';
import { MorbidityGroupModule } from './morbidity-group/morbidity-group.module';

@Module({
  imports: [MorbidityModule, MorbidityGroupModule]
})
export class MorbidityModule {}
