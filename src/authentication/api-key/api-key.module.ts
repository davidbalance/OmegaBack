import { Module } from '@nestjs/common';
import { ApiKeyManagementService } from './services/api-key-management.service';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyRepository } from './repositories/api-key.repository';
import { UserCredentialModule } from '../user-credential/user-credential.module';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { ApiKeyValidatorService } from './services/api-key-validator.service';
import { ApiKeyManagementController } from './controllers/api-key-management.controller';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ApiKey]),
    UserCredentialModule,
    AuthenticationGuardModule,
  ],
  controllers: [
    ApiKeyManagementController
  ],
  providers: [
    ApiKeyRepository,
    ApiKeyManagementService,
    ApiKeyValidatorService,
  ],
  exports: [
    ApiKeyManagementService,
    ApiKeyValidatorService
  ]
})
export class ApiKeyModule { }
