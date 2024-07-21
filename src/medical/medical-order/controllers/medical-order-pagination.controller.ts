import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PlainMedicalOrderPaginationService } from "../services/plain-medical-order-pagination.service";
import { GETPlainMedicalOrderPaginationRequestDto, GETPlainMedicalOrderPaginationResponseDto } from "../dtos/get.plain-medical-order-pagination.dto";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders/paginate')
@UseGuards(JwtAuthGuard)
export class MedicalOrderPaginationController {
  constructor(
    @Inject(PlainMedicalOrderPaginationService) private readonly service: PlainMedicalOrderPaginationService
  ) { }

  @Post()
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: GETPlainMedicalOrderPaginationRequestDto
  ): Promise<GETPlainMedicalOrderPaginationResponseDto> {
    const [pages, data] = await this.service.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(GETPlainMedicalOrderPaginationResponseDto, { pages, data });
  }
}
