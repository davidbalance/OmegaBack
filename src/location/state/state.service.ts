import { Inject, Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateRepository } from './state.repository';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {

  constructor(
    @Inject(StateRepository) private readonly repository: StateRepository
  ) { }

  async create(createStateDto: CreateStateDto): Promise<State> {
    return await this.repository.create(createStateDto);
  }

  async readAll(): Promise<State[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<State> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    return await this.repository.findOneAndUpdate({ id }, updateStateDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
