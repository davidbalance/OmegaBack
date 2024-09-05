import { CountMetaDto, FilterMetaDto, PageResponseDto } from "@/shared/utils/bases/base.pagination.dto";
import { GetDiseaseArrayResponseDto } from "../dtos/response/get.disease-array.response.dto";
import { DiseasePaginationService } from "../services/disease-pagination.service";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { Controller, UseGuards, Inject, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

@ApiTags('Disease/Disease', 'Pagination')
@ApiBearerAuth()
@Controller('disease/:group/diseases')
@UseGuards(JwtAuthGuard)
export class DiseasePaginationController {
    constructor(
        @Inject(DiseasePaginationService) private readonly service: DiseasePaginationService
    ) { }

    @Get('paginate')
    async find(
        @Param('group') group: number,
        @Query() query: FilterMetaDto
    ): Promise<GetDiseaseArrayResponseDto> {
        console.log(group, query);
        const data = await this.service.find(query, group);
        return plainToInstance(GetDiseaseArrayResponseDto, { data });
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
