import { Module } from '@nestjs/common';
import { ResultSendAttributeService } from './result-send-attribute.service';
import { SqlDatabaseModule } from '@/shared';
import { ResultSendAttribute } from './entities/result-send-attribute.entity';
import { ResultSendAttributeRepository } from './result-send-attribute.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([ResultSendAttribute])],
  providers: [
    ResultSendAttributeService,
    ResultSendAttributeRepository
  ],
  exports: [ResultSendAttributeService]
})
export class ResultSendAttributeModule { }
