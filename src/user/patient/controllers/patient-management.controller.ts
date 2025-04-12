import { Controller, Get, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ExtraAttribute, User } from '@/shared/decorator';
import { ExtraAttributeInterceptor } from '@/shared/interceptors/extra-attribute/extra-attribute.interceptor';
import { PatientManagementService } from '../service/patient-management.service';
import { GetPatientArrayResponseDto } from '../dtos/response/get.patient-array.response.dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientManagementController {
  constructor(
    @Inject(PatientManagementService) private readonly service: PatientManagementService
  ) { }

  @Get()
  async find(): Promise<GetPatientArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetPatientArrayResponseDto, { data });
  }

  @ExtraAttribute('look_for_company')
  @UseInterceptors(ExtraAttributeInterceptor)
  @Get('look/company')
  async findByCompany(
    @User() ruc: string,
  ): Promise<GetPatientArrayResponseDto> {
    const data = await this.service.findByExtraAttribute('employee_of', ruc);
    return plainToInstance(GetPatientArrayResponseDto, { data });
  }
}
