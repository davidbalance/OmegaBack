import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExamSelectorService } from '../services/exam-selector.service';
import { GetExamSelectorOptionArrayResponseDto } from '../dtos/response/get.exam-selector.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Selector', 'Laboratory/Exam')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('selector/exams')
export class ExamSelectorController {
  constructor(
    @Inject(ExamSelectorService) private readonly service: ExamSelectorService
  ) { }

  @Get()
  async findSelectorOptions(): Promise<GetExamSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GetExamSelectorOptionArrayResponseDto, { options });
  }
}
