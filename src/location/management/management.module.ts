import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { ManagementRepository } from './management.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared';
import { Management } from './entities/management.entity';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([Management]),
    AuthenticationGuardModule
  ],
  controllers: [
    ManagementController
  ],
  providers: [
    ManagementService,
    ManagementRepository
  ],
  exports: [
    ManagementService
  ]
})
export class ManagementModule { }
