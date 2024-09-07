import { Controller, Inject, UseGuards, Get, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetManagementArrayResponseDto } from "../dtos/response/management-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ManagementPaginationService } from "../services/management-pagination.service";
import { FilterMetaDto, CountMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";

@ApiTags('Location>Management', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/managements')
export class ManagementPaginationController {
  
  constructor(
    @Inject(ManagementPaginationService) private readonly service: ManagementPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetManagementArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetManagementArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}
