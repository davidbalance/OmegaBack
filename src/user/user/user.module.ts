import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SqlDatabaseModule } from 'src/shared';
import { User } from './entities/user.entity';
import { CredentialListener } from './listeners/credential.listener';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([User]),
    AuthenticationGuardModule,
    LocalAuthorizationModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CredentialListener,
    UserRepository,
    AuthorizationGuard
  ],
  exports: [UserService]
})
export class UserModule { }
