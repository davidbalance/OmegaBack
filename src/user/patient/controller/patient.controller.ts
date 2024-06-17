import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { FindPatientsResponseDTO } from '@/user/common';
import { PatientService } from '../service/patient.service';
import { ExtraAttribute, User } from '@/shared/decorator';
import { ExtraAttributeInterceptor } from '@/shared/interceptors/extra-attribute/extra-attribute.interceptor';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.find();
    return plainToInstance(FindPatientsResponseDTO, { patients });
  }

  @UseGuards(JwtAuthGuard)
  @ExtraAttribute('look_for_company')
  @UseInterceptors(ExtraAttributeInterceptor)
  @Get('look/company')
  async findByCompany(
    @User() ruc: string,
  ): Promise<FindPatientsResponseDTO> {
    const patients = await this.patientService.findByExtraAttribute('employee_of', ruc);
    return plainToInstance(FindPatientsResponseDTO, { patients });
  }
}
