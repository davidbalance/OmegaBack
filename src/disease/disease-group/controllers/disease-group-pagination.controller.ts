import { Controller, UseGuards, Get, Inject, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { GetDiseaseGroupSingleArrayResponseDto } from "../dtos/response/get.disease-group-single-array.response.dto";
import { DiseaseGroupPaginationService } from "../services/disease-group-pagination.service";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";

@ApiTags('Disease/Group', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('disease/groups')
export class DiseaseGroupPaginationController {
  constructor(
    @Inject(DiseaseGroupPaginationService) private readonly service: DiseaseGroupPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetDiseaseGroupSingleArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetDiseaseGroupSingleArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}
