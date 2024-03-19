import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post('signature/:id')
  @UseInterceptors(FileInterceptor('signature'))
  async uploadSignature(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    await this.doctorService.uploadSignature(id, file);
  }

}
