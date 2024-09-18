import { Controller, UseGuards, Inject, Get, Param, Patch, Body } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { MedicalResultManagementService } from "../services/medical-result-management.service";
import { GetMedicalResultResponseDto } from "../dtos/response/medical-result.get.dto";
import { PatchMedicalResultRequestDto } from "../dtos/request/medical-result.patch.dto";

@ApiTags('Medical>Result')
@ApiBearerAuth()
@Controller('medical/:id/result')
@UseGuards(JwtAuthGuard)
export class MedicalResultManagementController {
  constructor(
    @Inject(MedicalResultManagementService) private readonly service: MedicalResultManagementService
  ) { }

  @Get()
  async find(
    @Param('id') id: number,
  ): Promise<GetMedicalResultResponseDto> {
    const data = await this.service.findOne(id);
    return plainToInstance(GetMedicalResultResponseDto, data);
  }

  @Patch()
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchMedicalResultRequestDto
  ): Promise<any> {
    await this.service.updateOne(id, body);
    return {}
  }
}
