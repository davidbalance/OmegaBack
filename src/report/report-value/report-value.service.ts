import { Inject, Injectable } from '@nestjs/common';
import { CreateReportValueDto } from './dto/create-report-value.dto';
import { UpdateReportValueDto } from './dto/update-report-value.dto';
import { ReportValueRepository } from './report-value.repository';
import { ReportValue } from './entities/report-value.entity';

@Injectable()
export class ReportValueService {

  constructor(
    @Inject(ReportValueRepository) private readonly repository: ReportValueRepository
  ) { }

  async create(createReportValueDto: CreateReportValueDto): Promise<ReportValue> {
    return await this.repository.create(createReportValueDto);
  }

  async readAll(): Promise<ReportValue[]> {
    return await this.repository.find({});
  }

  async findOne(id: number): Promise<ReportValue> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateReportValueDto: UpdateReportValueDto): Promise<ReportValue> {
    return await this.repository.findOneAndUpdate({ id }, updateReportValueDto);
  }

  async remove(id: number): Promise<void> {
    return await this.repository.findOneAndDelete({ id });
  }
}
