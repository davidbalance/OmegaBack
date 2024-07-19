import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common'; import { POSTExamTypeRequestDto, POSTExamTypeResponseDto } from '../dtos/post.exam-type.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PATCHExamTypeRequestDto, PATCHExamTypeResponseDto } from '../dtos/patch.exam-type.dto';
import { ExamTypeManagementService } from '../services/exam-type-management.service';
import { plainToInstance } from 'class-transformer';
import { DELETEExamTypeResponseDto } from '../dtos/delete.exam-type.dto';
import { GETExamTypeArrayResponseDto, GETExamTypeResponseDto } from '../dtos/get.exam-type.dto';

@ApiTags('Laboratory/Exam/Type')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/type')
export class ExamTypeManagementController {
  constructor(
    @Inject(ExamTypeManagementService) private readonly service: ExamTypeManagementService
  ) { }

  @Post()
  async create(
    @Body() data: POSTExamTypeRequestDto
  ): Promise<POSTExamTypeResponseDto> {
    const type = await this.service.create(data);
    return plainToInstance(POSTExamTypeResponseDto, type);
  }

  @Get()
  async findAll(): Promise<GETExamTypeArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GETExamTypeArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GETExamTypeResponseDto> {
    const type = await this.service.findOne(+id);
    return plainToInstance(GETExamTypeResponseDto, type);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() data: PATCHExamTypeRequestDto
  ): Promise<PATCHExamTypeResponseDto> {
    const type = await this.service.updateOne(+id, data);
    return plainToInstance(PATCHExamTypeResponseDto, type);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string
  ): Promise<DELETEExamTypeResponseDto> {
    await this.service.deleteOne(+id);
    return {}
  }
}
