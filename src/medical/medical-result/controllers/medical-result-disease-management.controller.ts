import { Controller, UseGuards, Get, Post, Param, Body, Patch, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.post.dto";
import { GetMedicalResultDiseaseResponseDto } from "../dtos/response/medical-result-disease.get.dto";
import { PatchMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.patch.dto";
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
  ): Promise<any> {
    await this.service.create(body);
    return {}
  }

  @Get('disease/:id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetMedicalResultDiseaseResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetMedicalResultDiseaseResponseDto, data);
  }

  @Patch('disease/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchMedicalResultDiseaseRequestDto
  ): Promise<any> {
    const data = await this.service.updateOne(id, body)
    return {}
  }

  @Delete('disease/:id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.deleteOne(id);
    return {};
  }
}
