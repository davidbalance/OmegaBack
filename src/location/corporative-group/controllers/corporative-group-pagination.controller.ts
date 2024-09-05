import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetCorporativeGroupSingleArrayResponseDto } from '../dtos/response/get.corporative-group-single-array.response.dto';
import { CorporativeGroupPaginationService } from '../services/corporative-group-pagination.service';
import { FilterMetaDto, CountMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';

@ApiTags('Location/Corporative/Group', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/groups')
export class CorporativeGroupPaginationController {
  constructor(
    @Inject(CorporativeGroupPaginationService) private readonly service: CorporativeGroupPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetCorporativeGroupSingleArrayResponseDto> {
    const data = await this.service.find(query);
    console.log(data);
    return plainToInstance(GetCorporativeGroupSingleArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}