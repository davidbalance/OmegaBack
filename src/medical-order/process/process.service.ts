import { Inject, Injectable } from '@nestjs/common';
import { Process } from './entities/process.entity';
import { ProcessRepository } from './process.repository';
import { CreateProcessRequestDTO } from './dto';

@Injectable()
export class ProcessService {

  constructor(
    @Inject(ProcessRepository) private readonly repository: ProcessRepository
  ) { }

  async create(createProcess: CreateProcessRequestDTO): Promise<Process> {
    return await this.repository.create(createProcess);
  }

  async find(): Promise<Process[]> {
    return await this.repository.find({});
  }
}
