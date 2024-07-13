import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PatientService } from '../service/patient.service';
import { ExtraAttribute, User } from '@/shared/decorator';
import { ExtraAttributeInterceptor } from '@/shared/interceptors/extra-attribute/extra-attribute.interceptor';
import { GETPatientArrayResponseDto, GETPatientArrayWithPageCountResponseDto } from '../dtos/patient.response.dto';
import { GETPatientByFilterAndPaginationRequestDto } from '../dtos/patient.request.dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<GETPatientArrayResponseDto> {
    const patients = await this.patientService.find();
    return plainToInstance(GETPatientArrayResponseDto, { patients });
  }

  @UseGuards(JwtAuthGuard)
  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: GETPatientByFilterAndPaginationRequestDto
  ): Promise<GETPatientArrayWithPageCountResponseDto> {
    const patients = await this.patientService.findByFilterAndPagination(page, limit, filter, order);
    const pages = await this.patientService.findByPageCount(limit, filter);
    return plainToInstance(GETPatientArrayWithPageCountResponseDto, { patients, pages });
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
