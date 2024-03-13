import { Module } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';
import { MorbidityGroupController } from './morbidity-group.controller';
import { MorbidityGroup } from './entities/morbidity-group.entity';
import { SqlDatabaseModule } from 'src/shared';

@Module({
  imports: [SqlDatabaseModule.forFeature([MorbidityGroup])],
  controllers: [MorbidityGroupController],
  providers: [MorbidityGroupService]
})
export class MorbidityGroupModule { }
