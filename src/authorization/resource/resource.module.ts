import { forwardRef, Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { SqlDatabaseModule } from '@/shared';
import { Resource } from './entities/resource.entity';
import { ResourceRepository } from './resource.repository.dto';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { LocalAuthorizationModule } from '@/shared/shared-authorization/local-authorization/local-authorization.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Resource]),
    AuthenticationGuardModule,
    forwardRef(() => LocalAuthorizationModule)
  ],
  controllers: [
    ResourceController
  ],
  providers: [
    ResourceService,
    ResourceRepository,
    AuthorizationGuard
  ],
  exports: [ResourceService]
})
export class ResourceModule { }
