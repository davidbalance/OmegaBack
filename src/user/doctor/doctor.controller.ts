import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDoctorRequestDTO, CreateDoctorResponseDTO, FindDoctorsResponseDTO, FindOneDoctorAndUpdateRequestDTO, FindOneDoctorAndUpdateResponseDTO } from '../common';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  async create(
    @Body() body: CreateDoctorRequestDTO
  ): Promise<CreateDoctorResponseDTO> {
    await this.doctorService.create(body);
    return;
  }

  @Get()
  async find(): Promise<FindDoctorsResponseDTO> {
    const doctors = await this.doctorService.find();
    return { doctors };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneDoctorAndUpdateRequestDTO
  ): Promise<FindOneDoctorAndUpdateResponseDTO> {
    await this.doctorService.findOneAndUpdate(id, body);
    return;
  }

  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature'))
  async uploadSignature(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<FindOneDoctorAndUpdateResponseDTO> {
    await this.doctorService.uploadSignature(id, file);
    return;
  }

}
