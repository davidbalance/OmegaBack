import { Controller, Get, Inject, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ExtraAttribute, User } from '@/shared/decorator';
import { ExtraAttributeInterceptor } from '@/shared/interceptors/extra-attribute/extra-attribute.interceptor';
import { GetPatientArrayResponseDto } from '../dtos/response/patient-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { PatientLookForCompanyPaginationService } from '../service/patient-look-for-company-pagination.service';
import { CountMetaDto, FilterMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';

@ApiTags('User>Patient', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients/look/company')
export class PatientLookForCompanyPaginationController {
  constructor(
    @Inject(PatientLookForCompanyPaginationService) private readonly service: PatientLookForCompanyPaginationService
  ) { }

  @ExtraAttribute('look_for_company')
  @UseInterceptors(ExtraAttributeInterceptor)
  @Get('paginate')
  async find(
    @User() ruc: string,
    @Query() query: FilterMetaDto
  ): Promise<GetPatientArrayResponseDto> {
    const data = await this.service.find(query, { name: 'employee_of', value: ruc });
    return plainToInstance(GetPatientArrayResponseDto, { data });
  }

  @ExtraAttribute('look_for_company')
  @UseInterceptors(ExtraAttributeInterceptor)
  @Get('pages')
  async count(
    @User() ruc: string,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, { name: 'employee_of', value: ruc });
    return plainToInstance(PageResponseDto, { pages });
  }
}
