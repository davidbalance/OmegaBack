import { Body, Controller, Get, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindDoctorsResponseDTO, FindOneDoctorAndUpdateResponseDTO, UploadSignatureRequestDTO } from '../common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';
import { FileTypePipe } from '@/shared/pipes/file-type/file-type.pipe';
import { MIME_TYPES } from '@/shared/pipes/file-type/constants';

@ApiTags('User')
@ApiBearerAuth()
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Authorize(ClaimEnum.READ, 'doctors')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindDoctorsResponseDTO> {
    const doctors = await this.doctorService.find();
    return plainToInstance(FindDoctorsResponseDTO, { doctors });
  }

  @ApiConsumes('multipart/form-data')
  @Authorize(ClaimEnum.UPDATE, 'doctors')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
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
