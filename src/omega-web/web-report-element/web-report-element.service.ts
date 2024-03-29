import { Injectable } from '@nestjs/common';
import { CreateWebReportElementDto } from './dto/create-web-report-element.dto';
import { UpdateWebReportElementDto } from './dto/update-web-report-element.dto';

@Injectable()
export class WebReportElementService {
  create(createWebReportElementDto: CreateWebReportElementDto) {
    return 'This action adds a new webReportElement';
  }

  findAll() {
    return `This action returns all webReportElement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webReportElement`;
  }

  update(id: number, updateWebReportElementDto: UpdateWebReportElementDto) {
    return `This action updates a #${id} webReportElement`;
  }

  remove(id: number) {
    return `This action removes a #${id} webReportElement`;
  }
}
