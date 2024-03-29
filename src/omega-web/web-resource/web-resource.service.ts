import { Injectable } from '@nestjs/common';
import { CreateWebResourceDto } from './dto/create-web-resource.dto';
import { UpdateWebResourceDto } from './dto/update-web-resource.dto';

@Injectable()
export class WebResourceService {
  create(createWebResourceDto: CreateWebResourceDto) {
    return 'This action adds a new webResource';
  }

  findAll() {
    return `This action returns all webResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webResource`;
  }

  update(id: number, updateWebResourceDto: UpdateWebResourceDto) {
    return `This action updates a #${id} webResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} webResource`;
  }
}
