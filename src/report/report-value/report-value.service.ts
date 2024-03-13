import { Injectable } from '@nestjs/common';
import { CreateReportValueDto } from './dto/create-report-value.dto';
import { UpdateReportValueDto } from './dto/update-report-value.dto';

@Injectable()
export class ReportValueService {
  create(createReportValueDto: CreateReportValueDto) {
    return 'This action adds a new reportValue';
  }

  findAll() {
    return `This action returns all reportValue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportValue`;
  }

  update(id: number, updateReportValueDto: UpdateReportValueDto) {
    return `This action updates a #${id} reportValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportValue`;
  }
}
