import { User } from "@/shared/decorator";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { Controller, UseGuards, Inject, Get, UseInterceptors, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { GetMedicalResultArrayResponseDto } from "../dtos/response/get.medical-result-array.response.dto";
import { GetMedicalResultResponseDto } from "../dtos/response/get.medical-result.response.dto";

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
    return plainToInstance(GetMedicalResultArrayResponseDto, { results: results });
  }
}
