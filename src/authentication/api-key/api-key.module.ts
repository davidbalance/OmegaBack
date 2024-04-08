import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { SqlDatabaseModule } from '@/shared';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyRepository } from './api-key.repository';
import { UserCredentialModule } from '../user-credential/user-credential.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ApiKey]),
    UserCredentialModule
  ],
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    ApiKeyRepository
  ],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
