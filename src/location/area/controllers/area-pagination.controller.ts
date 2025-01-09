import { Controller, Get, Param, UseGuards, Inject, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetAreaArrayResponseDto } from '../dtos/response/area-array.get.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { FilterMetaDto, CountMetaDto, PageResponseDto } from '@/shared/utils/bases/base.pagination.dto';
import { AreaPaginationService } from '../services/area-pagination.service';

@ApiTags('Location>Area', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/areas')
export class AreaPaginationController {
  constructor(
    @Inject(AreaPaginationService) private readonly service: AreaPaginationService
  ) { }

  @Get('paginate')
  async find(
    @Query() query: FilterMetaDto
  ): Promise<GetAreaArrayResponseDto> {
    const data = await this.service.find(query);
    return plainToInstance(GetAreaArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query);
    return plainToInstance(PageResponseDto, { pages });
  }
}