import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { ExamSubtypeManagementService } from '../services/exam-subtype-management.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostExamSubtypeRequestDto } from '../dtos/request/exam-subtype.post.dto';
import { plainToInstance } from 'class-transformer';
import { PatchExamSubtypeRequestDto } from '../dtos/request/exam-subtype.patch.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetExamSubtypeResponseDto } from '../dtos/response/exam-subtype.get.dto';
import { HasValueResponseDto } from '@/shared/utils/bases/base.has-value.dto';

@ApiTags('Laboratory>Exam Subtype')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/subtypes')
export class ExamSubtypeManagementController {
  constructor(
    @Inject(ExamSubtypeManagementService) private readonly examSubtypeService: ExamSubtypeManagementService
  ) { }

  @Post()
  async create(
    @Body() data: PostExamSubtypeRequestDto
  ): Promise<any> {
    await this.examSubtypeService.create(data);
    return {}
  }

  @Get('subtype/:id')
  async findOne(
    @Param('id') id: number
  ): Promise<GetExamSubtypeResponseDto> {
    const data = await this.examSubtypeService.findOne(+id);
    return plainToInstance(GetExamSubtypeResponseDto, data);
  }

  @Get('subtype/:id/has/exams')
  async hasExams(
    @Param('id') id: number
  ): Promise<HasValueResponseDto> {
    const hasValue = await this.examSubtypeService.hasExams(+id);
    return plainToInstance(HasValueResponseDto, { hasValue });
  }

  @Patch('subtype/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchExamSubtypeRequestDto
  ): Promise<any> {
    await this.examSubtypeService.updateOne(+id, body);
    return {}
  }

  @Delete('subtype/:id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.examSubtypeService.deleteOne(+id);
    return {};
  }
}
