import { CreateSenderStatusRequestDTO, UpdateSenderStatusRequestDTO } from '@/shared';
import { Inject, Injectable } from '@nestjs/common';
import { SenderStatusRepository } from './sender-status.repository';

@Injectable()
export class SenderStatusService {

  constructor(
    @Inject(SenderStatusRepository) private readonly repository: SenderStatusRepository
  ) { }

  create(createSenderStatusDto: CreateSenderStatusRequestDTO) {
    return 'This action adds a new senderStatus';
  }

  findAll() {
    return `This action returns all senderStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} senderStatus`;
  }

  update(id: number, updateSenderStatusDto: UpdateSenderStatusRequestDTO) {
    return `This action updates a #${id} senderStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} senderStatus`;
  }
}
