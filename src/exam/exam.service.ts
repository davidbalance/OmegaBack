import { Inject, Injectable } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';
import { CreateExamRequestDTO, FindOneOrCreateService } from 'src/shared';

type FindExamParams = Omit<Exam, 'id' | 'results'>;

@Injectable()
export class ExamService
  implements FindOneOrCreateService<Exam> {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async findOneOrCreate(filterOption: any, createOption: any): Promise<Exam> {
    const examOptions = createOption as CreateExamRequestDTO
    const filter = filterOption as Partial<FindExamParams & { id: number }>;
    try {
      return await this.findOne(filter);
    } catch (error) {
      return await this.create(examOptions);
    }
  }

  async create(createExamDto: CreateExamRequestDTO): Promise<Exam> {
    return await this.repository.create(createExamDto);
  }

  async find(params?: Partial<FindExamParams>): Promise<Exam[]> {
    return await this.repository.find(params);
  }

  async findOne(params?: Partial<FindExamParams & { id: number }>): Promise<Exam> {
    return await this.repository.findOne(params);
  }
}
