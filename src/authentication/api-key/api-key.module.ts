import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { SqlDatabaseModule } from '@/shared';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyRepository } from './api-key.repository';
import { UserModule } from '@/user/user/user.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([ApiKey]),
    UserModule
  ],
  controllers: [ApiKeyController],
  providers: [
    ApiKeyService,
    ApiKeyRepository
  ]
})
export class ApiKeyModule { }
