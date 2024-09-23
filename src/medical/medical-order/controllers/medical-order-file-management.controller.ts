import { Controller, UseGuards, Inject, UseInterceptors, Patch, Param, Body, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { PatchMedicalResultFileRequestDto } from "@/medical/medical-report/dtos/request/medical-report-file.patch.dto";
import { MedicalOrderFileManagementService } from "../services/medical-order-file-management.service";

@ApiTags('Medical>Result')
@ApiBearerAuth()
@Controller('medical/:id/order/file')
@UseGuards(JwtAuthGuard)
export class MedicalOrderFileManagementController {
  constructor(
    @Inject(MedicalOrderFileManagementService) private readonly service: MedicalOrderFileManagementService
  ) { }

  @ApiConsumes('multipart/form-data')
  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: number,
    @Body() _: PatchMedicalResultFileRequestDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    await this.service.uploadFile(id, file);
    return {};
  }
}
