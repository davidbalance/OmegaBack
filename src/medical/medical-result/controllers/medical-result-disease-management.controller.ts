import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Param, Body, Patch, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GETMedicalResultDiseaseArrayResponseDto, GETMedicalResultDiseaseResponseDto } from "../dtos/get.medical-result-disease.dto";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { POSTMedicalResultDiseaseRequestDto, POSTMedicalResultDiseaseResponseDto } from "../dtos/post.medical-result-disease.dto";
import { PATCHMedicalResultDiseaseRequestDto, PATCHMedicalResultDiseaseResponseDto } from "../dtos/patch.medical-result-disease.dto";
import { DELETEMedicalResultDiseaseResponseDto } from "../dtos/delete.medical-result-disease.dto";

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
    @Body() body: POSTMedicalResultDiseaseRequestDto
  ): Promise<POSTMedicalResultDiseaseResponseDto> {
    const data = await this.service.create(body);
    return plainToInstance(POSTMedicalResultDiseaseResponseDto, data);
  }

  @Get()
  async find(): Promise<GETMedicalResultDiseaseArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GETMedicalResultDiseaseArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GETMedicalResultDiseaseResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GETMedicalResultDiseaseResponseDto, data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PATCHMedicalResultDiseaseRequestDto
  ): Promise<PATCHMedicalResultDiseaseResponseDto> {
    const data = await this.service.updateOne(id, body)
    return plainToInstance(PATCHMedicalResultDiseaseResponseDto, data);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DELETEMedicalResultDiseaseResponseDto> {
    await this.service.deleteOne(id);
    return {};
  }
}
