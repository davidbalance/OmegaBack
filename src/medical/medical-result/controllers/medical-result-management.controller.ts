import { Controller, UseGuards, Inject, Get, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetMedicalResultResponseDto } from "../dtos/response/medical-result.GET.dto";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results')
@UseGuards(JwtAuthGuard)
export class MedicalResultManagementController {
  constructor(
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService
  ) { }

  @Get('result/:id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetMedicalResultResponseDto> {
    const data = await this.service.findOne(+id);
    return plainToInstance(GetMedicalResultResponseDto, data);
  }
}
