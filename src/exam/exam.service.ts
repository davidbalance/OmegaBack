import { Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return await this.repository.create(createExamDto);
  }

  async readAll(): Promise<Exam[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<Exam> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam> {
    return await this.repository.findOneAndUpdate({ id }, updateExamDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
