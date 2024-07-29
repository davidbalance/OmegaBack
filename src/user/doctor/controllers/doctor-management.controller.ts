import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { DoctorManagementService } from '../services/doctor-management.service';
import { GETDoctorArrayResponseDto } from '../dtos/get.doctor-management.dto';

@ApiTags('User/Doctor')
@ApiBearerAuth()
@Controller('doctors')
export class DoctorManagementController {
  constructor(
    @Inject(DoctorManagementService) private readonly doctorService: DoctorManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETDoctorArrayResponseDto> {
    const doctors = await this.doctorService.find();
    return plainToInstance(GETDoctorArrayResponseDto, { doctors });
  }
}
