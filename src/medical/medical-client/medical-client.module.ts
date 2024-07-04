import { Module } from '@nestjs/common';
import { MedicalClientService } from './medical-client.service';
import { MedicalClientController } from './medical-client.controller';
import { SqlDatabaseModule } from '@/shared';
import { MedicalClient } from './entities/medical-client.entity';
import { MedicalEmail } from './entities/medical-email.entity';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { MedicalClientRepository } from './repositories/medical-client.repository';
import { MedicalEmailRepository } from './repositories/medical-email.repository';
import { DniInterceptorModule } from '@/shared/interceptors/dni/dni-interceptor.module';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([MedicalClient, MedicalEmail]),
    AuthenticationGuardModule,
    DniInterceptorModule
  ],
  controllers: [
    MedicalClientController
  ],
  providers: [
    MedicalClientService,
    MedicalClientRepository,
    MedicalEmailRepository
  ],
  exports: [
    MedicalClientService
  ]
})
export class MedicalClientModule { }
