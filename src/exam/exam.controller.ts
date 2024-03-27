import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { FindExamsResponseDTO } from '@/shared';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Get()
  async find(): Promise<FindExamsResponseDTO> {
    const exams = await this.examService.find();
    return { exams }
  }
}
