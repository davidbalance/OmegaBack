import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { ExamSubtypeManagementService } from '../services/exam-subtype-management.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { POSTExamSubtypeRequestDto, POSTExamSubtypeResponseDto } from '../dto/post.exam-subtype.dto';
import { PATCHExamSubtypeRequestDto, PATCHExamSubtypeResponseDto } from '../dto/patch.exam-subtype.dto';
import { plainToInstance } from 'class-transformer';
import { GETExamSubtypeArrayResponseDto, GETExamSubtypeResponseDto } from '../dto/get.exam-subtype.dto';
import { DELETEExamSubtypeResponseDto } from '../dto/delete.exam-subtype.dto';

@ApiTags('Laboratory/Exam/Subtype')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/subtype')
export class ExamSubtypeManagementController {
  constructor(
    @Inject(ExamSubtypeManagementService) private readonly examSubtypeService: ExamSubtypeManagementService
  ) { }

  @Post()
  async create(
    @Body() data: POSTExamSubtypeRequestDto
  ): Promise<POSTExamSubtypeResponseDto> {
    const subtype = await this.examSubtypeService.create(data);
    return plainToInstance(POSTExamSubtypeResponseDto, subtype);
  }

  @Get()
  async findAll(): Promise<GETExamSubtypeArrayResponseDto> {
    const data = await this.examSubtypeService.findAll();
    return plainToInstance(GETExamSubtypeArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GETExamSubtypeResponseDto> {
    const data = this.examSubtypeService.findOne(+id);
    return plainToInstance(GETExamSubtypeResponseDto, data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateExamSubtypeDto: PATCHExamSubtypeRequestDto
  ): Promise<PATCHExamSubtypeResponseDto> {
    const data = await this.examSubtypeService.updateOne(+id, updateExamSubtypeDto);
    return plainToInstance(PATCHExamSubtypeResponseDto, data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ): Promise<DELETEExamSubtypeResponseDto> {
    await this.examSubtypeService.deleteOne(+id);
    return {};
  }
}
