import { Controller, Get, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ExtraAttribute, User } from '@/shared/decorator';
import { ExtraAttributeInterceptor } from '@/shared/interceptors/extra-attribute/extra-attribute.interceptor';
import { PatientManagementService } from '../service/patient-management.service';
import { GETPatientArrayResponseDto } from '../dtos/get.patient-managment,dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
export class PatientManagementController {
  constructor(
    @Inject(PatientManagementService) private readonly patientService: PatientManagementService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETPatientArrayResponseDto> {
    const patients = await this.patientService.find();
    return plainToInstance(GETPatientArrayResponseDto, { patients });
  }

  @UseGuards(JwtAuthGuard)
  @ExtraAttribute('look_for_company')
  @UseInterceptors(ExtraAttributeInterceptor)
  @Get('look/company')
  async findByCompany(
    @User() ruc: string,
  ): Promise<GETPatientArrayResponseDto> {
    const patients = await this.patientService.findByExtraAttribute('employee_of', ruc);
    return plainToInstance(GETPatientArrayResponseDto, { patients });
  }
}
