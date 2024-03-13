import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Result } from './entities/result.entity';
import { ResultRepository } from './result.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Result])
  ],
  controllers: [ResultController],
  providers: [ResultService, ResultRepository]
})
export class ResultModule { }
