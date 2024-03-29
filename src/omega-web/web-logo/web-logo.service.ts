import { Injectable } from '@nestjs/common';
import { CreateWebLogoDto } from './dto/create-web-logo.dto';
import { UpdateWebLogoDto } from './dto/update-web-logo.dto';

@Injectable()
export class WebLogoService {
  create(createWebLogoDto: CreateWebLogoDto) {
    return 'This action adds a new webLogo';
  }

  findAll() {
    return `This action returns all webLogo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webLogo`;
  }

  update(id: number, updateWebLogoDto: UpdateWebLogoDto) {
    return `This action updates a #${id} webLogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} webLogo`;
  }
}
