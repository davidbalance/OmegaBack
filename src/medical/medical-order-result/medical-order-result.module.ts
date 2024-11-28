import { Module } from '@nestjs/common';
import { MedicalOrderResultExternalService } from './services/medical-order-result-external.service';
import { MedicalOrderResultExternalConnectionController } from './controllers/medical-order-result-external.controller';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { MedicalOrderModule } from '../medical-order/medical-order.module';
import { MedicalOrderResultLocalController } from './controllers/medical-order-result-local.controller';
import { MedicalOrderResultLocalService } from './services/medical-order-result-local.service';

@Module({
  imports: [
    MedicalOrderModule,
    MedicalResultModule
  ],
  controllers: [
    MedicalOrderResultExternalConnectionController,
    MedicalOrderResultLocalController
  ],
  providers: [
    MedicalOrderResultExternalService,
    MedicalOrderResultLocalService
  ],
})
export class MedicalOrderResultModule { }
