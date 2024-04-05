import { Module } from '@nestjs/common';
import { ResultExternalKeyService } from './result-external-key.service';
import { SqlDatabaseModule } from '@/shared';
import { ResultExternalKey } from './entities/result-external-key.entity';
import { ResultExternalKeyRepository } from './result-external-key.respository';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ResultExternalKey])
  ],
  providers: [
    ResultExternalKeyService,
    ResultExternalKeyRepository
  ],
  exports: [ResultExternalKeyService]
})
export class ResultExternalKeyModule { }
