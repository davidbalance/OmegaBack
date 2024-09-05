import { Controller, Body, Inject, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderFlatPaginationService } from "../services/medical-order-flat-pagination.service";
import { GetMedicalOrderFlatArrayResponseDto } from "../dtos/response/post.medical-order-flat-pagination.response.dto";
import { CountMetaDto, FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders')
@UseGuards(JwtAuthGuard)
export class MedicalOrderPaginationController {
  constructor(
    @Inject(MedicalOrderFlatPaginationService) private readonly service: MedicalOrderFlatPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Body() query: FilterMetaDto
  ): Promise<GetMedicalOrderFlatArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetMedicalOrderFlatArrayResponseDto, { data });
  }

  @Get('count')
  async count(
    @Body() query: CountMetaDto
  ): Promise<GetMedicalOrderFlatArrayResponseDto> {
    const data = await this.service.count(query);
    return plainToInstance(GetMedicalOrderFlatArrayResponseDto, { data });
  }
}
