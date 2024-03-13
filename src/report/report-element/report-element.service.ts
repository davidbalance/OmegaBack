import { Inject, Injectable } from '@nestjs/common';
import { CreateReportElementDto } from './dto/create-report-element.dto';
import { UpdateReportElementDto } from './dto/update-report-element.dto';
import { ReportElementRepository } from './report-element.repository';
import { ReportElement } from './entities/report-element.entity';

@Injectable()
export class ReportElementService {

  constructor(
    @Inject(ReportElementRepository) private readonly repository: ReportElementRepository
  ) { }

  async create(createReportElementDto: CreateReportElementDto): Promise<ReportElement> {
    return await this.repository.create(createReportElementDto);
  }

  async readAll(): Promise<ReportElement[]> {
    return await this.repository.find({ status: false });
  }

  async readOneByID(id: number): Promise<ReportElement> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateReportElementDto: UpdateReportElementDto): Promise<ReportElement> {
    return await this.repository.findOneAndUpdate({ id }, updateReportElementDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
