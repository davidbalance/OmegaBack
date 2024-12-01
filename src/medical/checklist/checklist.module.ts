import { Module } from '@nestjs/common';
import { ChecklistService } from './services/checklist.service';
import { ChecklistController } from './controllers/checklist.controller';
import { MedicalOrderModule } from '../medical-order/medical-order.module';
import { MedicalResultModule } from '../medical-result/medical-result.module';
import { PdfManagerModule } from '@/shared/pdf-manager/pdf-manager.module';
import { FSModule } from '@/shared/nest-ext/fs/fs.module';
import { PathModule } from '@/shared/nest-ext/path/path.module';

@Module({
  imports: [
    MedicalOrderModule,
    MedicalResultModule,
    PdfManagerModule,
    FSModule,
    PathModule
  ],
  providers: [ChecklistService],
  controllers: [ChecklistController]
})
export class ChecklistModule { }
