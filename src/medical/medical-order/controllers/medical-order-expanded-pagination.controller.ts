import { Controller, Inject, Get, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { MedicalOrderExpandedPaginationService } from "../services/medical-order-expanded-pagination.service";
import { GetExapandedMedicalOrderResponseDto } from "../dtos/response/expanded-medical-order-array.get.dto";

@ApiTags('Medical>Order', 'Pagination')
@ApiBearerAuth()
@Controller('medical/orders/expanded')
@UseGuards(JwtAuthGuard)
export class MedicalOrderExpandedPaginationController {
  constructor(
    @Inject(MedicalOrderExpandedPaginationService) private readonly service: MedicalOrderExpandedPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetExapandedMedicalOrderResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetExapandedMedicalOrderResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}
