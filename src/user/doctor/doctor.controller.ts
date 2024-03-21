import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDoctorRequestDTO, CreateDoctorResponseDTO, FindDoctorResponseDTO, FindOneDoctorResponseDTO, UpdateDoctorRequestDTO, UpdateDoctorResponseDTO } from '@/shared';

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
  async find(): Promise<FindDoctorResponseDTO> {
    const doctors = await this.doctorService.find();
    return { doctors };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<FindOneDoctorResponseDTO> {
    const doctor = await this.doctorService.findOne({ id });
    return { doctor };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: Omit<UpdateDoctorRequestDTO, 'password'>
  ): Promise<UpdateDoctorResponseDTO> {
    await this.doctorService.findOneAndUpdate(id, body);
    return;
  }

  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature'))
  async uploadSignature(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    await this.doctorService.uploadSignature(id, file);
  }

}
