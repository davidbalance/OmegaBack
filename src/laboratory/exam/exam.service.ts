import { Inject, Injectable } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { SelectorOption } from '@/shared';

@Injectable()
export class ExamService {

  constructor(
    @Inject(ExamRepository) private readonly repository: ExamRepository
  ) { }

  async findSelectorOptions(): Promise<SelectorOption<number>[]> {
    const exams = await this.repository.find({ select: { name: true, id: true } });
    const options: SelectorOption<number>[] = exams
      .map((e) => ({
        key: e.id,
        label: e.name
      } as SelectorOption<number>));
    return options;
  }

}
