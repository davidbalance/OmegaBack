import { Module } from '@nestjs/common';
import { ExternalKeyRepository } from './external-key.repository';
import { SqlDatabaseModule } from '@/shared';
import { ExternalKey } from './entities/external-key.entity';
import { ExternalKeyService } from './external-key.service';

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
