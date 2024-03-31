import { Module } from '@nestjs/common';
import { SendValue } from './entities/send-value.entity';
import { SqlDatabaseModule } from '@/shared';

@Module({
    imports: [SqlDatabaseModule.forFeature([SendValue])]
})
export class SendValueModule { }
