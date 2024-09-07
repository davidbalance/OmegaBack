import { Inject, Injectable } from '@nestjs/common';
import { ExamTypeRepository } from '../repositories/exam-type.repository';
import { ExtendedExamType } from '../dtos/response/extended-exam-type.base.dto';

@Injectable()
export class ExamTypeOptionService {

  constructor(
    @Inject(ExamTypeRepository) private readonly repository: ExamTypeRepository
  ) { }

  async find(): Promise<ExtendedExamType[]> {
    const types = await this.repository.find({ where: { status: true } });
    return types;
  }
}
