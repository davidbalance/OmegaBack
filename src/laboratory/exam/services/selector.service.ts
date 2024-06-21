import { Inject, Injectable } from '@nestjs/common';
import { ExamRepository } from '../exam.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class SelectorService {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async find(): Promise<SelectorOption<number>[]> {
    const exams = await this.repository.createQuery('exam')
      .select('exam.id', 'key')
      .addSelect('exam.name', 'label')
      .getRawMany<SelectorOption<number>>();
    return exams;
  }

}
