import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { SendController } from './send.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Send } from './entities/send.entity';
import { SendRepository } from './send.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Send])
  ],
  controllers: [SendController],
  providers: [SendService, SendRepository]
})
export class SendModule { }
