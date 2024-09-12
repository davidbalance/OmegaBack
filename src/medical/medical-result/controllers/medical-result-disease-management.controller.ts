import { Controller, UseGuards, Get, Post, Param, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultDiseaseManagementService } from "../services/medical-result-disease-management.service";
import { PostMedicalResultDiseaseRequestDto } from "../dtos/request/medical-result-disease.post.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetMedicalResultDiseaseArrayResponseDto } from "../dtos/response/medical-result-disease-array.get.dto";

@ApiTags('Medical>Result>Disease')
@ApiBearerAuth()
@Controller('medical/:result/diseases')
@UseGuards(JwtAuthGuard)
export class MedicalResultDiseaseManagementController {
  constructor(
    @Inject(MedicalResultDiseaseManagementService) private readonly service: MedicalResultDiseaseManagementService
  ) { }

  @Get()
  async find(
    @Param('result') result: number
  ): Promise<GetMedicalResultDiseaseArrayResponseDto> {
    const data = await this.service.find(result);
    return plainToInstance(GetMedicalResultDiseaseArrayResponseDto, { data });

  }

  @Post()
  async create(
    @Param('result') result: number,
    @Body() body: PostMedicalResultDiseaseRequestDto
  ): Promise<any> {
    await this.service.create(result, body);
    return {}
  }
}
