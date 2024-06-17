import { Body, Controller, Get, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { FileTypePipe } from '@/shared/pipes/file-type/file-type.pipe';
import { MIME_TYPES } from '@/shared/pipes/file-type/constants';
import { FindDoctorsResponseDTO, UploadSignatureRequestDTO, FindOneDoctorAndUpdateResponseDTO } from '@/user/common';
import { DoctorService } from '../services/doctor.service';

@ApiTags('User/Doctor')
@ApiBearerAuth()
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindDoctorsResponseDTO> {
    const doctors = await this.doctorService.find();
    return plainToInstance(FindDoctorsResponseDTO, { doctors });
  }

  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature'))
  async uploadSignature(
    @Param('id') id: number,
    @Body() body: UploadSignatureRequestDTO,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypePipe({ acceptableTypes: MIME_TYPES.PNG })
      ],
      fileIsRequired: true
    })) file: Express.Multer.File
  ): Promise<FindOneDoctorAndUpdateResponseDTO> {
    await this.doctorService.uploadSignature(id, file);
    return {};
  }
}
