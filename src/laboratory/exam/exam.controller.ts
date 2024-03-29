import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { FindExamSelectorOptions } from './dtos';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindExamSelectorOptions> {
    const options = await this.examService.findSelectorOptions();
    return { options };
  }
}
