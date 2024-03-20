import { CreateSenderStatusRequestDTO, UpdateSenderStatusRequestDTO } from '@/shared';
import { Inject, Injectable } from '@nestjs/common';
import { SenderStatusRepository } from './sender-status.repository';
import { SenderStatus } from './entities/sender-status.entity';

@Injectable()
export class SenderStatusService {

  constructor(
    @Inject(SenderStatusRepository) private readonly repository: SenderStatusRepository
  ) { }

  async create(createSender: CreateSenderStatusRequestDTO): Promise<SenderStatus> {
    return await this.repository.create(createSender);
  }

  async find(): Promise<SenderStatus[]> {
    return await this.repository.find({});
  }

  async update(id: number, updateSender: UpdateSenderStatusRequestDTO): Promise<SenderStatus> {
    return await this.repository.findOneAndUpdate({ id: id }, updateSender);
  }

  async inactive(id: number): Promise<SenderStatus> {
    return await this.repository.findOneAndUpdate({ id: id }, { status: false });
  }
}
