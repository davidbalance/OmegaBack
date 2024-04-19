import { Module, Provider } from '@nestjs/common';
import { LocalAuthorizationService } from './local-authorization.service';
import { AccessControlModule } from '@/authorization/access-control/access-control.module';
import { AuthorizationService } from '../authorization.service';

const AuthorizationProvider: Provider = { provide: AuthorizationService, useClass: LocalAuthorizationService };

@Module({
  imports: [
    AccessControlModule
  ],
  providers: [AuthorizationProvider],
  exports: [AuthorizationProvider]
})
export class LocalAuthorizationModule { }
