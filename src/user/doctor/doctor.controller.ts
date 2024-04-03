import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindDoctorsResponseDTO, FindOneDoctorAndUpdateResponseDTO } from '../common';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Get()
  async find(): Promise<FindDoctorsResponseDTO> {
    const doctors = await this.doctorService.find();
    return plainToInstance(FindDoctorsResponseDTO, { doctors });
  }

  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature'))
  async uploadSignature(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FindOneDoctorAndUpdateResponseDTO> {
    await this.doctorService.uploadSignature(id, file);
    return {};
  }
}
