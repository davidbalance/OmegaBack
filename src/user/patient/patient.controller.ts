import {
  Controller,
  Get,
  UseGuards
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  FindPatientsResponseDTO
} from '../common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('User')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Authorize(ClaimEnum.READ, 'patients')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return plainToInstance(FindPatientsResponseDTO, { patients });
  }
}
