import { Inject, Injectable } from '@nestjs/common';
import { ISelectorOption, ISelectorOptionService } from '@/shared/utils/bases/base.selector';
import { ExamRepository } from '../repositories/exam.repository';

@Injectable()
export class ExamSelectorService implements ISelectorOptionService<number> {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async find(params: any = null): Promise<ISelectorOption<number>[]> {
    const exams = await this.repository.query('exam')
      .select('exam.id', 'key')
      .addSelect('exam.name', 'label')
      .getRawMany<ISelectorOption<number>>();
    return exams;
  }
}
