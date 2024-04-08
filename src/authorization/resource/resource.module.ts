import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { SqlDatabaseModule } from '@/shared';
import { Resource } from './entities/resource.entity';
import { ResourceRepository } from './resource.repository.dto';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Resource]),
    AuthenticationGuardModule
  ],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ResourceRepository
  ],
  exports: [ResourceService]
})
export class ResourceModule { }
