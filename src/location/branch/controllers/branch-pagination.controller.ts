import { Controller, Get, Inject, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { BranchPaginationService } from "../services/branch-pagination.service";
import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { GetBranchArrayResponseDto } from "../dtos/response/branch-array.get.dto";

@ApiTags('Location/Branch', 'Pagination')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location/:company/branches')
export class BranchPaginationController {
    constructor(
        @Inject(BranchPaginationService) private readonly service: BranchPaginationService
    ) { }

    @Get('paginate')
    async find(
        @Param('company') company: number,
        @Query() query: FilterMetaDto
    ): Promise<GetBranchArrayResponseDto> {
        const data = await this.service.find(query, company);
        return plainToInstance(GetBranchArrayResponseDto, { data });
    }

    @Get('pages')
    async count(
        @Param('company') company: number,
        @Query() query: CountMetaDto
    ): Promise<PageResponseDto> {
        const pages = await this.service.count(query, company);
        return plainToInstance(PageResponseDto, { pages });
    }
}