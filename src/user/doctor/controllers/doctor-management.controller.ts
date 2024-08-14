import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DoctorManagementService } from '../services/doctor-management.service';
import { GetDoctorArrayResponseDto } from '../dtos/response/get.doctor-array.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('User/Doctor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorManagementController {
  constructor(
    @Inject(DoctorManagementService) private readonly doctorService: DoctorManagementService
  ) { }

  @Get()
  async find(): Promise<GetDoctorArrayResponseDto> {
    const data = await this.doctorService.find();
    return plainToInstance(GetDoctorArrayResponseDto, { data });
  }
}
