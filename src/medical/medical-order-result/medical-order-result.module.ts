import { Module } from '@nestjs/common';
import { MedicalOrderResultExternalService } from './services/medical-order-result-external.service';
import { MedicalOrderResultExternalConnectionController } from './controllers/medical-order-result-external.controller';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { MedicalOrderModule } from '../medical-order/medical-order.module';

@Module({
  imports: [
    MedicalOrderModule,
    MedicalResultModule
  ],
  providers: [MedicalOrderResultExternalService],
  controllers: [MedicalOrderResultExternalConnectionController]
})
export class MedicalOrderResultModule { }
