import { Module } from '@nestjs/common';
import { DiseaseModule as DiseaseSubModule } from './disease/disease.module';
import { DiseaseGroupModule } from './disease-group/disease-group.module';

@Module({
  imports: [
    DiseaseSubModule, 
    DiseaseGroupModule
  ]
})
export class DiseaseModule { }
