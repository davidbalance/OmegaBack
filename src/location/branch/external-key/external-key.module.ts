import { SqlDatabaseModule } from '@/shared';
import { Module } from '@nestjs/common';
import { ExternalKey } from './entities/external-key.entity';
import { ExternalKeyRepository } from './external-key.repository';
import { ExternalKeyService } from './external-key.service';
import { ExternalConnectionController } from '../controllers/external-connection.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ExternalKey])
  ],
  providers: [
    ExternalKeyService,
    ExternalKeyRepository
  ],
  exports: [ExternalKeyService],
})
export class ExternalKeyModule { }
