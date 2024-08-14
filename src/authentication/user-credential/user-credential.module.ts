import { Module } from '@nestjs/common';
import { UserCredential } from './entities/user-credential.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { UserCredentialController } from './controllers/user-credential.controller';
import { UserCredentialRepository } from './repositories/user-credential.repository';
import { UserCredentialService } from './services/user-credential.service';
import { UserOnEventCredentialListener } from './listeners/user-on-event-credential.listener';
import { UserCredentialValidatorService } from './services/user-credential-validator.service';
import { UserCredentialEventService } from './services/user-credential-event.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([UserCredential]),
    AuthenticationGuardModule,
  ],
  controllers: [
    UserCredentialController
  ],
  providers: [
    UserCredentialRepository,
    UserCredentialEventService,
    UserCredentialValidatorService,
    UserCredentialService,
    UserOnEventCredentialListener,
  ],
  exports: [
    UserCredentialService,
    UserCredentialValidatorService
  ]
})
export class UserCredentialModule { }
