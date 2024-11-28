import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDoctorArrayResponseDto } from '../dtos/response/doctor-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { DoctorOptionService } from '../services/doctor-option.service';

@ApiTags('User>Doctor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user/doctors/options')
export class DoctorOptionController {
  constructor(
    @Inject(DoctorOptionService) private readonly service: DoctorOptionService
  ) { }

  @Get()
  async find(): Promise<GetDoctorArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetDoctorArrayResponseDto, { data });
  }
}
