import { Module } from '@nestjs/common';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ExternalKeyService } from './external-key.service';
import { ExternalKeyRepository } from './external-key.repository';
import { ExternalKey } from './entities/external-key.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExternalKey])
  ],
  providers: [
    ExternalKeyService,
    ExternalKeyRepository
  ],
  exports: [
    ExternalKeyService
  ]
})
export class ExternalKeyModule { }
