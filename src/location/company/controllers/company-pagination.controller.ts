import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { UseGuards, Controller, Inject, Param, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { FilterMetaDto, CountMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { CompanyPaginationService } from "../services/company-pagination.service";
import { GetCompanyArrayResponseDto } from "../dtos/response/company-array.get.dto";

@ApiTags('Location>Company', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/:group/companies')
export class CompanyPaginationController {
    constructor(
        @Inject(CompanyPaginationService) private readonly service: CompanyPaginationService
    ) { }

    @Get('paginate')
    async find(
        @Param('group') group: number,
        @Query() query: FilterMetaDto
    ): Promise<GetCompanyArrayResponseDto> {
        const data = await this.service.find(query, group);
        return plainToInstance(GetCompanyArrayResponseDto, { data });
    }

    @Get('pages')
    async count(
        @Param('group') group: number,
        @Query() query: CountMetaDto
    ): Promise<PageResponseDto> {
        const pages = await this.service.count(query, group);
        return plainToInstance(PageResponseDto, { pages });
    }
}