import { Controller, UseGuards, Post, Body, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { MedicalOrderFlatPaginationService } from "../services/medical-order-flat-pagination.service";
import { PostMedicalOrderFlatPaginationRequestDto } from "../dtos/request/post.medical-order-flat-pagination.request.dto";
import { PostMedicalOrderFlatPaginationResponseDto } from "../dtos/response/post.medical-order-flat-pagination.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

@ApiTags('Medical/Order')
@ApiBearerAuth()
@Controller('medical/orders/paginate')
@UseGuards(JwtAuthGuard)
export class MedicalOrderPaginationController {
  constructor(
    @Inject(MedicalOrderFlatPaginationService) private readonly service: MedicalOrderFlatPaginationService
  ) { }

  @Post()
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: PostMedicalOrderFlatPaginationRequestDto
  ): Promise<PostMedicalOrderFlatPaginationResponseDto> {
    const [pages, data] = await this.service.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(PostMedicalOrderFlatPaginationResponseDto, { pages, data });
  }
}
