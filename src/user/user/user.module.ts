import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { UserExtraAttribute } from './entities/user-extra-attribute.entity';
import { UserExtraAttributeRepository } from './repositories/user-extra-attribute.repository';
import { UserExtraAttributeService } from './services/user-extra-attributes.service';
import { UserEventService } from './services/user-event.service';
import { UserManagementService } from './services/user-management.service';
import { CredentialUserListener } from './listeners/credential-user.listener';
import { UserExtraAttributeController } from './controllers/user-extra-attribute.controller';
import { UserManagementController } from './controllers/user-management.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([User, UserExtraAttribute]),
    AuthenticationGuardModule,
  ],
  controllers: [
    UserManagementController,
    UserExtraAttributeController
  ],
  providers: [
    UserManagementService,
    UserExtraAttributeService,
    UserEventService,
    UserRepository,
    UserExtraAttributeRepository,
    CredentialUserListener,
  ],
  exports: [
    UserManagementService
  ]
})
export class UserModule { }
