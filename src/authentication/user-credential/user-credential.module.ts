import { Module } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredentialController } from './user-credential.controller';
import { SqlDatabaseModule } from 'src/shared';
import { UserCredential } from './entities/user-credential.entity';
import { UserCredentialRepository } from './user-credential.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SqlDatabaseModule.forFeature([UserCredential]), UserModule],
  controllers: [UserCredentialController],
  providers: [UserCredentialService, UserCredentialRepository]
})
export class UserCredentialModule { }
