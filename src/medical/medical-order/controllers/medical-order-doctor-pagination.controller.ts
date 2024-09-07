import { Controller, Inject, Get, UseGuards, Param, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetMedicalOrderArrayResponseDto } from "../dtos/response/medical-order-array.get.dto";
import { MedicalOrderDoctorPaginationService } from "../services/medical-order-doctor-pagination.service";

@ApiTags('Medical>Order', 'Pagination')
@ApiBearerAuth()
@Controller('patient/:dni/medical/orders/doctor')
@UseGuards(JwtAuthGuard)
export class MedicalOrderDoctorPaginationController {
  constructor(
    @Inject(MedicalOrderDoctorPaginationService) private readonly service: MedicalOrderDoctorPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Param('dni') dni: string,
    @Query() query: FilterMetaDto
  ): Promise<GetMedicalOrderArrayResponseDto> {
    const data = await this.service.find(query, dni);
    return plainToInstance(GetMedicalOrderArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Param('dni') dni: string,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, dni);
    return plainToInstance(PageResponseDto, { pages });
  }
}
