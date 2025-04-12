import { Inject, Injectable } from '@nestjs/common';
import { SelectorOption, SelectorOptionService } from '@/shared/utils/bases/base.selector';
import { ExamRepository } from '../repositories/exam.repository';

@Injectable()
export class ExamSelectorService implements SelectorOptionService<number> {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async find(params: any = null): Promise<SelectorOption<number>[]> {
    const exams = await this.repository.query('exam')
      .select('exam.id', 'key')
      .addSelect('exam.name', 'label')
      .getRawMany<SelectorOption<number>>();
    return exams;
  }
}
