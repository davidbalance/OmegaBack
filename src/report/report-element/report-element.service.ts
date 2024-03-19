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

  async readAll(): Promise<ReportElement[]> {
    return await this.repository.find({ status: false });
  }

  async readOneByID(id: number): Promise<ReportElement> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateReportElementDto: UpdateReportValueRequestDTO): Promise<ReportElement> {
    return await this.repository.findOneAndUpdate({ id }, updateReportElementDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndUpdate({ id }, { status: false });
  }
}
