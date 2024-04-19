import { Controller, Get, NotAcceptableException, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindDoctorsResponseDTO, FindOneDoctorAndUpdateResponseDTO } from '../common';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';
import { FileTypePipe } from '@/shared/pipes/file-type/file-type.pipe';
import { MIME_TYPES } from '@/shared/pipes/file-type/constants';

@ApiTags('User')
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

  @Authorize(ClaimEnum.UPDATE, 'doctors')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature')) // Upload it, only let png files
  async uploadSignature(
    @Param('id') id: number,
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
