import { UseGuards, Controller, Inject, Patch, UseInterceptors, Body, Param, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { MedicalReportFileManagementService } from "../services/medical-report-file-management.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { PatchMedicalResultFileRequestDto } from "../dtos/request/medical-report-file.patch.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical>Report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/report/file')
export class MedicalReportFileManagementController {
    constructor(
        @Inject(MedicalReportFileManagementService) private readonly service: MedicalReportFileManagementService
    ) { }

    @ApiConsumes('multipart/form-data')
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadfile(
        @Param('id') id: number,
        @Body() _: PatchMedicalResultFileRequestDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<any> {
        await this.service.uploadFile(id, file);
        return {};
    }
}