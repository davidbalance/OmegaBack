import { Module } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredentialController } from './user-credential.controller';
import { SqlDatabaseModule } from 'src/shared';
import { UserCredential } from './entities/user-credential.entity';
import { UserCredentialRepository } from './user-credential.repository';
import { UserListener } from './listeners';

@Module({
  imports: [SqlDatabaseModule.forFeature([UserCredential])],
  controllers: [UserCredentialController],
  providers: [
    UserCredentialService,
    UserCredentialRepository,
    UserListener
  ],
  exports: [UserCredentialService]
})
export class UserCredentialModule { }
