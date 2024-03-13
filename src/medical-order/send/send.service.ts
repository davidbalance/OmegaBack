import { Inject, Injectable } from '@nestjs/common';
import { CreateSendDto } from './dto/create-send.dto';
import { UpdateSendDto } from './dto/update-send.dto';
import { SendRepository } from './send.repository';
import { Send } from './entities/send.entity';

@Injectable()
export class SendService {

  constructor(
    @Inject(SendRepository) private readonly repository: SendRepository
  ) { }

  async create(createSendDto: CreateSendDto): Promise<Send> {
    return await this.repository.create(createSendDto);
  }

  async readAll(): Promise<Send[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Send> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateSendDto: UpdateSendDto): Promise<Send> {
    return await this.repository.findOneAndUpdate({ id }, updateSendDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
