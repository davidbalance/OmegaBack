import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { SqlDatabaseModule } from '@/shared';
import { AccessControl } from './entity/access-control.entity';
import { AccessControlRepository } from './access-control.repository';
import { UserListener } from './listeners';

@Module({
  imports: [SqlDatabaseModule.forFeature([AccessControl])],
  providers: [
    AccessControlService,
    UserListener,
    AccessControlRepository],
  exports: [AccessControlService]
})
export class AccessControlModule { }
