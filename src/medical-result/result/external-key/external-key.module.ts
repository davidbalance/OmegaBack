import { SqlDatabaseModule } from '@/shared';
import { Module } from '@nestjs/common';
import { ExternalKey } from './entities/external-key.entity';

@Module({
    imports: [SqlDatabaseModule.forFeature([ExternalKey])]
})
export class ExternalKeyModule { }
