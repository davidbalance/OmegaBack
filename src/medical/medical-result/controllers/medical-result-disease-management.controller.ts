import { Controller, UseGuards, Get, Post, Param, Body, Patch, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/post.medical-result-disease.dto";
import { PostMedicalResultDiseaseResponseDto } from "../dtos/response/post.medical-result-disease.response.dto";
import { GetMedicalResultDiseaseArrayResponseDto } from "../dtos/response/get.medical-result-disease-array.response.dto";
import { GetMedicalResultDiseaseResponseDto } from "../dtos/response/get.medical-result-disease.response.dto";
import { PatchMedicalResultDiseaseRequestDto } from "../dtos/request/patch.medical-result-disease.request.dto";
import { PatchMedicalResultDiseaseResponseDto } from "../dtos/response/patch.medical-result-disease.response.dto";
import { DeleteMedicalResultDiseaseResponseDto } from "../dtos/response/delete.medical-result-disease.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results/diseases')
@UseGuards(JwtAuthGuard)
export class MedicalResultDiseaseManagementController {
  constructor(
    @Inject(MedicalResultDiseaseManagementService) private readonly service: MedicalResultDiseaseManagementService
  ) { }

  @Post()
  async create(
    @Body() body: PostMedicalResultDiseaseRequestDto
  ): Promise<PostMedicalResultDiseaseResponseDto> {
    const data = await this.service.create(body);
    return plainToInstance(PostMedicalResultDiseaseResponseDto, data);
  }

  @Get()
  async find(): Promise<GetMedicalResultDiseaseArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GetMedicalResultDiseaseArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetMedicalResultDiseaseResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetMedicalResultDiseaseResponseDto, data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchMedicalResultDiseaseRequestDto
  ): Promise<PatchMedicalResultDiseaseResponseDto> {
    const data = await this.service.updateOne(id, body)
    return plainToInstance(PatchMedicalResultDiseaseResponseDto, data);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DeleteMedicalResultDiseaseResponseDto> {
    await this.service.deleteOne(id);
    return {};
  }
}
