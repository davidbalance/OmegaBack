import { User } from "@/shared/decorator";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { Controller, UseGuards, Inject, Get, UseInterceptors, Param, Body, Post } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GETMedicalResultArrayResponseDto, GETMedicalResultResponseDto } from "../dtos/get.medical-result.dto";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { POSTMedicalResultRequestDto, POSTMedicalResultResponseDto } from "../dtos/post.medical-result.dto";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results')
@UseGuards(JwtAuthGuard)
export class MedicalResultManagementController {
  constructor(
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService
  ) { }

  @Post()
  async create(
    @Body() body: POSTMedicalResultRequestDto
  ): Promise<POSTMedicalResultResponseDto> {
    const data = await this.service.create(body);
    return plainToInstance(POSTMedicalResultResponseDto, data);
  }

  @Get()
  async find(): Promise<GETMedicalResultArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GETMedicalResultArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GETMedicalResultResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GETMedicalResultResponseDto, data);
  }

  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<GETMedicalResultArrayResponseDto> {
    const results = await this.service.findAllByDoctor(user);
    return plainToInstance(GETMedicalResultArrayResponseDto, { results: results });
  }
}
