import { User } from "@/shared/decorator";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { Controller, UseGuards, Inject, Get, UseInterceptors, Param, Patch, Body } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { GetMedicalResultArrayResponseDto } from "../dtos/response/get.medical-result-array.response.dto";
import { GetMedicalResultResponseDto } from "../dtos/response/get.medical-result.response.dto";
import { PatchMedicalResultResponseDto } from "../dtos/response/patch.medical-result.response.dto";
import { PatchMedicalResultRequestDto } from "../dtos/request/patch.medical-result.request.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results')
@UseGuards(JwtAuthGuard)
export class MedicalResultManagementController {
  constructor(
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService
  ) { }

  @Get()
  async find(): Promise<GetMedicalResultArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GetMedicalResultArrayResponseDto, { data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetMedicalResultResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetMedicalResultResponseDto, data);
  }

  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<GetMedicalResultArrayResponseDto> {
    const results = await this.service.findAllByDoctor(user);
    return plainToInstance(GetMedicalResultArrayResponseDto, { data: results });
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchMedicalResultRequestDto
  ): Promise<PatchMedicalResultResponseDto> {
    const data = await this.service.updateOne(id, body);
    return plainToInstance(PatchMedicalResultResponseDto, data);
  }
}
