import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { CorporativeFindManyQuery } from "@omega/location/application/query/corporative/corporative-find-many.query";
import { CorporativeFindManyQueryDto } from "../dto/query/corporative_query.dto";
import { CorporativeManyResponseDto, CorporativeOptionResponseDto } from "../dto/response/corporative.dto";
import { CorporativeModelMapper } from "../mapper/corporative_model.mapper";
import { CorporativeFindOptionsQuery } from "@omega/location/application/query/corporative/corporative-find-options.query";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('corporatives')
export class CorporativeReadController {
    constructor(
        @InjectQuery('CorporativeFindMany') private readonly findManyQuery: CorporativeFindManyQuery,
        @InjectQuery('CorporativeFindOptions') private readonly findOptionsQuery: CorporativeFindOptionsQuery,
    ) { }

    @Get()
    async findMany(
        @Query() query: CorporativeFindManyQueryDto
    ): Promise<CorporativeManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => CorporativeModelMapper.toDTO(e));
        return plainToInstance(CorporativeManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<CorporativeOptionResponseDto[]> {
        const data = await this.findOptionsQuery.handleAsync();
        return plainToInstance(CorporativeOptionResponseDto, data);
    }
}