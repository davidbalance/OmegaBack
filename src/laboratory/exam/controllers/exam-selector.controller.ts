import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETSelectorOptionArrayResponseDto } from '../dtos/get.exam-selector.dto';
import { ExamSelectorService } from '../services/exam-selector.service';

@ApiTags('Selector', 'Laboratory/Exam')
@ApiBearerAuth()
@Controller('selector/exams')
export class ExamSelectorController {
  constructor(private readonly service: ExamSelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDto, { options });
  }
}