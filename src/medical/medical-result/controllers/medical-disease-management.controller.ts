import { Controller, UseGuards, Get, Param, Body, Patch, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { GetMedicalResultDiseaseResponseDto } from "../dtos/response/medical-result-disease.get.dto";
import { PatchMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.patch.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical>Result>Disease')
@ApiBearerAuth()
@Controller('medical/:id')
@UseGuards(JwtAuthGuard)
export class MedicalDiseaseManagementController {
  constructor(
    @Inject(MedicalResultDiseaseManagementService) private readonly service: MedicalResultDiseaseManagementService
  ) { }

  @Get('disease')
  async findOne(
    @Param('id') id: string
  ): Promise<GetMedicalResultDiseaseResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetMedicalResultDiseaseResponseDto, data);
  }

  @Patch('disease')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchMedicalResultDiseaseRequestDto
  ): Promise<any> {
    const data = await this.service.updateOne(id, body)
    return {}
  }

  @Delete('disease')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.deleteOne(id);
    return {};
  }
}
