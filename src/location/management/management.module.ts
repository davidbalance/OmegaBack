import { Module } from '@nestjs/common';
import { ManagementService } from './services/management.service';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { Management } from './entities/management.entity';
import { ManagementController } from './controllers/management.controller';
import { ManagementRepository } from './repositories/management.repository';

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
