import { Inject, Injectable } from '@nestjs/common';
import { StateRepository } from './state.repository';
import { State } from './entities/state.entity';
import { CreateStateRequestDTO, UpdateStateRequestDTO } from './dto';

@Injectable()
export class StateService {

  constructor(
    @Inject(StateRepository) private readonly repository: StateRepository
  ) { }

  async create(createStateDto: CreateStateRequestDTO): Promise<State> {
    return await this.repository.create(createStateDto);
  }

  async readAll(): Promise<State[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<State> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateStateDto: UpdateStateRequestDTO): Promise<State> {
    return await this.repository.findOneAndUpdate({ id }, updateStateDto);
  }
}
