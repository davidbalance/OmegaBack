import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Inject, UseInterceptors, Patch, Param, Body, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { PATCHMedicalResultFileRequestDto, PATCHMedicalResultFileResponseDto } from "../dtos/patch.medical-result.dto";
import { MedicalResultFileManagementService } from "../services/medical-result-file-management.service";

@ApiTags('Medical/Result')
@ApiBearerAuth()
@Controller('medical/results/file')
@UseGuards(JwtAuthGuard)
export class MedicalResultFileManagementController {
  constructor(
    @Inject(MedicalResultFileManagementService) private readonly service: MedicalResultFileManagementService
  ) { }

  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async findOneResultAndUploadFile(
    @Param('id') id: number,
    @Body() _: PATCHMedicalResultFileRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PATCHMedicalResultFileResponseDto> {
    await this.service.uploadFile(id, file);
    return {};
  }
}
