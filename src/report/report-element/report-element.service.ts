import { Inject, Injectable } from '@nestjs/common';
import { ReportElementRepository } from './report-element.repository';
import { ReportElement } from './entities/report-element.entity';
import { CreateRequestElementRequestDTO, UpdateReportValueRequestDTO } from 'src/shared';

@Injectable()
export class ReportElementService {

  constructor(
    @Inject(ReportElementRepository) private readonly repository: ReportElementRepository,
  ) { }

  async create(createReportElementDto: CreateRequestElementRequestDTO): Promise<ReportElement> {
    return await this.repository.create(createReportElementDto);
  }

  async find(): Promise<ReportElement[]> {
    return await this.repository.find({ status: false });
  }

  async findOne(id: number): Promise<ReportElement> {
    return await this.repository.findOne({ id });
  }

  async findOneAndUpdate(id: number, updateReportElementDto: UpdateReportValueRequestDTO): Promise<ReportElement> {
    return await this.repository.findOneAndUpdate({ id }, updateReportElementDto);
  }

  async findOneAndInactivate(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
