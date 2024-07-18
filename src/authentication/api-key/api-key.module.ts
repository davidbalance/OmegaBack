import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyRepository } from './api-key.repository';
import { UserCredentialModule } from '../user-credential/user-credential.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ApiKey]),
    UserCredentialModule,
    AuthenticationGuardModule,
  ],
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    ApiKeyRepository,
  ],
  exports: [ApiKeyService]
})
export class ApiKeyModule { }
