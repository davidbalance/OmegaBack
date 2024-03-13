import { Inject, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResultRepository } from './result.repository';
import { Result } from './entities/result.entity';
import { Send } from '../send/entities/send.entity';

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository
  ) { }

  async create(createResultDto: CreateResultDto): Promise<Result> {
    return await this.repository.create(createResultDto);
  }

  async readAll(): Promise<Result[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Result> {
    return await this.repository.findOne({ id });
  }

  async send(id: number, sends: Send[]): Promise<Result> {
    const send = await this.repository.findOne({ id }, { sends: true });
    const filterSends = send.sends.filter(e => !sends.includes(e));
    // Here goes send logic for each send item
    return this.repository.findOneAndSend({ id }, filterSends);
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    return await this.repository.findOneAndUpdate({ id }, updateResultDto);
  }

  async remove(id: number): Promise<void> {
    this.repository.findOneAndDelete({ id });
  }
}
