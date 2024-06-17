import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SqlDatabaseModule } from 'src/shared';
import { User } from './entities/user.entity';
import { CredentialListener } from './listeners/credential.listener';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { UserExtraAttribute } from './entities/user-extra-attribute';
import { UserExtraAttributeRepository } from './repositories/user-extra-attribute.repository';
import { UserExtraAttributeService } from './services/user-extra-attributes.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([User, UserExtraAttribute]),
    AuthenticationGuardModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserExtraAttributeService,
    CredentialListener,
    UserRepository,
    UserExtraAttributeRepository
  ],
  exports: [UserService]
})
export class UserModule { }
