import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorAndAssignUserRequestDTO, CreateDoctorRequestDTO, UpdateDoctorRequestDTO } from 'src/shared';
import { Doctor } from './entities/doctor.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  async create(
    @Body() body: CreateDoctorRequestDTO
  ): Promise<void> {
    await this.doctorService.create(body);
  }

  @Post('assign')
  async assignUser(
    @Body() body: CreateDoctorAndAssignUserRequestDTO
  ): Promise<void> {
    await this.doctorService.create(body, body.user);
  }

  @Get()
  async readAll(): Promise<Doctor[]> {
    return await this.doctorService.readAll();
  }

  @Get('doctor/:id')
  async readOneByID(
    @Param('id') id: number
  ): Promise<Doctor> {
    return await this.doctorService.readOneByID(id);
  }

  @Patch('doctor/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateDoctorRequestDTO
  ): Promise<void> {
    await this.doctorService.update(id, body);
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
