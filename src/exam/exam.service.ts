import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './entities/exam.entity';
import { CreateExamRequestDTO, FindOrCreateExamRequestDTO } from 'src/shared';

@Injectable()
export class ExamService {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async findOrCreateExam(exam: FindOrCreateExamRequestDTO): Promise<Exam> {
    try {
      return await this.repository.findOne({ labint: exam.key });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return await this.repository.create({
          name: exam.name,
          labint: exam.key
        });
      } else {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  async create(createExamDto: CreateExamRequestDTO): Promise<Exam> {
    return await this.repository.create(createExamDto);
  }

  async findAll(): Promise<Exam[]> {
    return await this.repository.find({});
  }
}
