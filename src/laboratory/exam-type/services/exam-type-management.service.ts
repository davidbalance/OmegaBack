import { Inject, Injectable } from '@nestjs/common';
import { ExamTypeRepository } from '../repositories/exam-type.repository';
import { ExamType } from '../entities/exam-type.entity';
import { PostExamTypeRequestDto } from '../dtos/request/post.exam-type.dto';
import { PatchExamTypeRequestDto } from '../dtos/request/patch.exam-type.dto';

@Injectable()
export class ExamTypeManagementService {

  constructor(
    @Inject(ExamTypeRepository) private readonly repository: ExamTypeRepository
  ) { }

  async create(data: PostExamTypeRequestDto): Promise<ExamType> {
    const type = await this.repository.create(data);
    return type;
  }

  async findAll(): Promise<ExamType[]> {
    const types = await this.repository.find({ where: { status: true } });
    return types;
  }

  async findOne(id: number): Promise<ExamType> {
    const type = await this.repository.findOne({ where: { id } });
    return type;
  }

  async updateOne(id: number, data: PatchExamTypeRequestDto): Promise<ExamType> {
    const type = await this.repository.findOneAndUpdate({ id }, data);
    return type;
  }

  async deleteOne(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
