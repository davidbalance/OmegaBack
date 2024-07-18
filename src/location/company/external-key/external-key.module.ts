import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ExternalKey } from './entities/external-key.entity';
import { ExternalKeyService } from './external-key.service';
import { ExternalKeyRepository } from './external-key.repository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExternalKey])
  ],
  providers: [
    ExternalKeyService,
    ExternalKeyRepository
  ],
  exports: [ExternalKeyService]
})
export class ExternalKeyModule { }
