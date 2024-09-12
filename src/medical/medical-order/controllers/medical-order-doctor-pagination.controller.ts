import { Controller, Inject, Get, UseGuards, Param, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { MedicalOrderDoctorPaginationService } from "../services/medical-order-doctor-pagination.service";
import { DniInterceptor } from "@/shared/interceptors/dni/dni.interceptor";
import { User } from "@/shared/decorator";
import { GetMedicalOrderDoctorArrayResponseDto } from "../dtos/response/medical-order-doctor.get.dto";

@ApiTags('Medical>Order', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(DniInterceptor)
@Controller('patient/:dni/medical/orders/doctor')
export class MedicalOrderDoctorPaginationController {
  constructor(
    @Inject(MedicalOrderDoctorPaginationService) private readonly service: MedicalOrderDoctorPaginationService
  ) { }


  @Get('paginate')
  async find(
    @Param('dni') patient: string,
    @User() doctor: string,
    @Query() query: FilterMetaDto
  ): Promise<GetMedicalOrderDoctorArrayResponseDto> {
    const data = await this.service.find(query, { doctor, patient });
    return plainToInstance(GetMedicalOrderDoctorArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Param('dni') patient: string,
    @User() doctor: string,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, { doctor, patient });
    return plainToInstance(PageResponseDto, { pages });
  }
}
