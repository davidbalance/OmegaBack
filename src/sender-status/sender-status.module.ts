import { Module } from '@nestjs/common';
import { SenderStatusService } from './sender-status.service';
import { SenderStatusController } from './sender-status.controller';
import { SenderStatusRepository } from './sender-status.repository';
import { SenderStatus } from './entities/sender-status.entity';
import { SqlDatabaseModule } from '@/shared';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([SenderStatus])
  ],
  controllers: [SenderStatusController],
  providers: [SenderStatusService, SenderStatusRepository]
})
export class SenderStatusModule { }
