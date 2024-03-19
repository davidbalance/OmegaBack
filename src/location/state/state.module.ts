import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { SqlDatabaseModule } from 'src/shared';
import { State } from './entities/state.entity';
import { StateRepository } from './state.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([State])],
  controllers: [StateController],
  providers: [StateService, StateRepository],
  exports: [StateService]
})
export class StateModule { }
