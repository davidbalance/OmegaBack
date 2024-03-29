import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SqlDatabaseModule } from 'src/shared';
import { User } from './entities/user.entity';
import { CredentialListener } from './listeners/credential.listener';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CredentialListener,
    UserRepository
  ],
  exports: [UserService]
})
export class UserModule { }
