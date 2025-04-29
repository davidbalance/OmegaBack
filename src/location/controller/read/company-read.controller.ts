import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { CompanyFindManyQuery } from "@omega/location/application/query/corporative/company-find-many.query";
import { CompanyFindManyQueryDto } from "../dto/query/company-query.dto";
import { CompanyManyResponseDto } from "../dto/response/company.dto";
import { CompanyModelMapper } from "../mapper/company-model.mapper";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompanyReadController {
    constructor(
        @InjectQuery('CompanyFindMany') private readonly findManyQuery: CompanyFindManyQuery,
    ) { }

    @Get(':corporativeId')
    async findMany(
        @Param('corporativeId') corporativeId: string,
        @Query() query: CompanyFindManyQueryDto
    ): Promise<CompanyManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined,
            corporativeId
        });
        const data = value.data.map(e => CompanyModelMapper.toDTO(e));
        return plainToInstance(CompanyManyResponseDto, { ...value, data });
    }
}