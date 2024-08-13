import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { ExamSubtypeManagementService } from '../services/exam-subtype-management.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostExamSubtypeRequestDto } from '../dtos/request/post.exam-subtype.dto';
import { PostExamSubtypeResponseDto } from '../dtos/response/post.exam-subtype.response.dto';
import { GetExamSubtypeArrayResponseDto } from '../dtos/response/get.exam-subtype-array.response.dto';
import { GetExamSubtypeResponseDto } from '../dtos/response/get.exam-subtype.response.dto';
import { plainToInstance } from 'class-transformer';
import { PatchExamSubtypeRequestDto } from '../dtos/request/patch.exam-subtype.dto';
import { PatchExamSubtypeResponseDto } from '../dtos/response/patch.exam-subtype.response.dto';
import { DeleteExamSubtypeResponseDto } from '../dtos/response/delete.exam-subtype.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Laboratory/Exam/Subtype')
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
  ): Promise<PostExamSubtypeResponseDto> {
    const subtype = await this.examSubtypeService.create(data);
    return plainToInstance(PostExamSubtypeResponseDto, subtype);
  }

  @Get()
  async findAll(): Promise<GetExamSubtypeArrayResponseDto> {
    const data = await this.examSubtypeService.findAll();
    return plainToInstance(GetExamSubtypeArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetExamSubtypeResponseDto> {
    const data = this.examSubtypeService.findOne(+id);
    return plainToInstance(GetExamSubtypeResponseDto, data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateExamSubtypeDto: PatchExamSubtypeRequestDto
  ): Promise<PatchExamSubtypeResponseDto> {
    const data = await this.examSubtypeService.updateOne(+id, updateExamSubtypeDto);
    return plainToInstance(PatchExamSubtypeResponseDto, data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DeleteExamSubtypeResponseDto> {
    await this.examSubtypeService.deleteOne(+id);
    return {};
  }
}
