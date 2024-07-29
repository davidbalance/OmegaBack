import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { UseGuards, Controller, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ExamTypeManagementService } from "../services/exam-type-management.service";
import { PostExamTypeRequestDto } from "../dtos/request/post.exam-type.dto";
import { PostExamResponseDto } from "@/laboratory/exam/dtos/response/post.exam.response.dto";
import { GetExamTypeArrayResponseDto } from "../dtos/response/get.exam-type-array.dto";
import { GetExamTypeResponseDto } from "../dtos/response/get.exam-type.dto";
import { PatchExamTypeRequestDto } from "../dtos/request/patch.exam-type.dto";
import { PatchExamTypeResponseDto } from "../dtos/response/patch.exam-type.dto";
import { DeleteExamTypeResponseDto } from "../dtos/response/delete.exam-type.dto";

@ApiTags('Laboratory/Exam/Type')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exam/types')
export class ExamTypeManagementController {
  constructor(
    @Inject(ExamTypeManagementService) private readonly service: ExamTypeManagementService
  ) { }

  @Post()
  async create(
    @Body() data: PostExamTypeRequestDto
  ): Promise<PostExamResponseDto> {
    const type = await this.service.create(data);
    return plainToInstance(PostExamResponseDto, type);
  }

  @Get()
  async findAll(): Promise<GetExamTypeArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GetExamTypeArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetExamTypeResponseDto> {
    const type = await this.service.findOne(+id);
    return plainToInstance(GetExamTypeResponseDto, type);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() data: PatchExamTypeRequestDto
  ): Promise<PatchExamTypeResponseDto> {
    const type = await this.service.updateOne(+id, data);
    return plainToInstance(PatchExamTypeResponseDto, type);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: string
  ): Promise<DeleteExamTypeResponseDto> {
    await this.service.deleteOne(+id);
    return {}
  }
}
