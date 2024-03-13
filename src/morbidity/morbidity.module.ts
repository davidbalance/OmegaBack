import { Module } from '@nestjs/common';
import { MorbidityModule as MorbiditySubModule } from './morbidity/morbidity.module';
import { MorbidityGroupModule } from './morbidity-group/morbidity-group.module';

@Module({
  imports: [MorbiditySubModule, MorbidityGroupModule]
})
export class MorbidityModule { }
