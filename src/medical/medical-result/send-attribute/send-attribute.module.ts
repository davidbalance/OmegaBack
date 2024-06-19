import { Module } from '@nestjs/common';
import { SendAttributeService } from './send-attribute.service';
import { SqlDatabaseModule } from '@/shared';
import { SendAttribute } from './entities/send-attribute.entity';
import { SendAttributeRepository } from './send-attribute.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([SendAttribute])],
  providers: [
    SendAttributeService,
    SendAttributeRepository
  ],
  exports: [SendAttributeService]
})
export class SendAttributeModule { }
