import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { MIME_TYPES } from '@/shared/pipes/file-type/constants';
import { FileTypePipe } from '@/shared/pipes/file-type/file-type.pipe';
import { Body, Controller, Inject, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { DoctorFileManagementService } from '../services/doctor-file-management.service';
import { PatchDoctorSignatureRequestDto } from '../dtos/request/patch.doctor-signature.dto';
import { PatchDoctorSignatureResponseDto } from '../dtos/response/patch.doctor-signature.response.dto';

@ApiTags('User/Doctor')
@ApiBearerAuth()
@ApiConsumes('multipart/form-data')
@UseGuards(JwtAuthGuard)
@Controller('doctors/files')
export class DoctorFileManagerController {

    constructor(
        @Inject(DoctorFileManagementService) private readonly service: DoctorFileManagementService
    ) { }

    @Post('signature/:id')
    @UseInterceptors(FileInterceptor('signature'))
    async uploadSignature(
        @Param('id') id: number,
        @Body() body: PatchDoctorSignatureRequestDto,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypePipe({ acceptableTypes: MIME_TYPES.PNG })
            ],
            fileIsRequired: true
        })) file: Express.Multer.File
    ): Promise<PatchDoctorSignatureResponseDto> {
        await this.service.uploadFile(id, file);
        return {};
    }
}
