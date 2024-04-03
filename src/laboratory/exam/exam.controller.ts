import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { FindSelectorOptionsExam } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exam')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsExam> {
    const options = await this.examService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsExam, { options });
  }
}
