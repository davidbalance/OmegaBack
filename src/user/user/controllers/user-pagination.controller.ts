import { Controller, UseGuards, Get, Inject, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GetUserArrayResponseDto } from "../dtos/response/user-array.get.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { UserPaginationService } from "../services/user-pagination.service";
import { FilterMetaDto, CountMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { User } from "@/shared/decorator";

@ApiTags('User/User', 'Pagination')
@ApiBearerAuth()
@Controller('user/users')
@UseGuards(JwtAuthGuard)
export class UserPaginationController {
  constructor(
    @Inject(UserPaginationService) private readonly service: UserPaginationService
  ) { }

  @Get('paginate')
  async find(
    @User() user: number,
    @Query() query: FilterMetaDto
  ): Promise<GetUserArrayResponseDto> {
    const data = await this.service.find(query, user);
    return plainToInstance(GetUserArrayResponseDto, { data });
  }

  @Get('pages')
  async count(
    @User() user: number,
    @Query() query: CountMetaDto
  ): Promise<PageResponseDto> {
    const pages = await this.service.count(query, user);
    return plainToInstance(PageResponseDto, { pages });
  }
}