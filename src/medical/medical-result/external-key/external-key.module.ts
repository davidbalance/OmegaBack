import { Module } from '@nestjs/common';
import { ExternalKeyService } from './external-key.service';
import { SqlDatabaseModule } from '@/shared';
import { ExternalKeyRepository } from './external-key.respository';
import { ExternalKey } from './entities/external-key.entity';

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
