import { Injectable } from '@nestjs/common';
import { CreateSendDto } from './dto/create-send.dto';
import { UpdateSendDto } from './dto/update-send.dto';

@Injectable()
export class SendService {
  create(createSendDto: CreateSendDto) {
    return 'This action adds a new send';
  }

  findAll() {
    return `This action returns all send`;
  }

  findOne(id: number) {
    return `This action returns a #${id} send`;
  }

  update(id: number, updateSendDto: UpdateSendDto) {
    return `This action updates a #${id} send`;
  }

  remove(id: number) {
    return `This action removes a #${id} send`;
  }
}
