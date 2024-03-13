import { Injectable } from '@nestjs/common';
import { CreateReportElementDto } from './dto/create-report-element.dto';
import { UpdateReportElementDto } from './dto/update-report-element.dto';

@Injectable()
export class ReportElementService {
  create(createReportElementDto: CreateReportElementDto) {
    return 'This action adds a new reportElement';
  }

  findAll() {
    return `This action returns all reportElement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportElement`;
  }

  update(id: number, updateReportElementDto: UpdateReportElementDto) {
    return `This action updates a #${id} reportElement`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportElement`;
  }
}
