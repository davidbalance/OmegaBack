import { Controller, UseGuards, Inject, Get, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { MedicalResultReportService } from "../services/medical-result-report.service";
import { GetMedicalResultReportResponseDto } from "../dtos/response/medical-report.get.dto";

@ApiTags('Medical>Result')
@ApiBearerAuth()
@Controller('medical/result/:id/report')
@UseGuards(JwtAuthGuard)
export class MedicalResultReportController {
  constructor(
    @Inject(MedicalResultReportService) private readonly service: MedicalResultReportService
  ) { }

  @Get()
  async find(
    @Param('id') id: number,
  ): Promise<GetMedicalResultReportResponseDto> {
    const data = await this.service.findOne(id);
    return plainToInstance(GetMedicalResultReportResponseDto, data);
  }
}
