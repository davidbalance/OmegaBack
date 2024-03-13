import { Inject, Injectable } from '@nestjs/common';
import { CreateMedicalReportDto } from './dto/create-medical-report.dto';
import { UpdateMedicalReportDto } from './dto/update-medical-report.dto';
import { MedicalReportRepository } from './medical-report.repository';
import { MedicalReport } from './entities/medical-report.entity';

@Injectable()
export class MedicalReportService {

  constructor(
    @Inject(MedicalReportRepository) private readonly repository: MedicalReportRepository
  ) { }

  async create(createMedicalReportDto: CreateMedicalReportDto): Promise<MedicalReport> {
    return await this.repository.create(createMedicalReportDto);
  }

  async readAll(): Promise<MedicalReport[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<MedicalReport> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateMedicalReportDto: UpdateMedicalReportDto): Promise<MedicalReport> {
    return await this.repository.findOneAndUpdate({ id }, updateMedicalReportDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
