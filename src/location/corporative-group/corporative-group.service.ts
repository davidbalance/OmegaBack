import { Injectable } from '@nestjs/common';
import { CreateCorporativeGroupDto } from './dto/create-corporative-group.dto';
import { UpdateCorporativeGroupDto } from './dto/update-corporative-group.dto';

@Injectable()
export class CorporativeGroupService {
  create(createCorporativeGroupDto: CreateCorporativeGroupDto) {
    return 'This action adds a new corporativeGroup';
  }

  findAll() {
    return `This action returns all corporativeGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corporativeGroup`;
  }

  update(id: number, updateCorporativeGroupDto: UpdateCorporativeGroupDto) {
    return `This action updates a #${id} corporativeGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} corporativeGroup`;
  }
}
