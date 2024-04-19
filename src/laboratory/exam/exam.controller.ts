import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { FindSelectorOptionsExam } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('Exam')
@ApiBearerAuth()
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @UseGuards(JwtAuthGuard)
  @Get('selector')
  async findSelectorOptions(): Promise<FindSelectorOptionsExam> {
    const options = await this.examService.findSelectorOptions();
    return plainToInstance(FindSelectorOptionsExam, { options });
  }
}
