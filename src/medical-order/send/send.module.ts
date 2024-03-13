import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { SendController } from './send.controller';
import { SqlDatabaseModule } from 'src/shared';
import { Send } from './entities/send.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([Send])],
  controllers: [SendController],
  providers: [SendService]
})
export class SendModule { }
