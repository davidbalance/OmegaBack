import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/location/nest/inject/query.inject";
import { BranchFindManyQuery } from "@omega/location/application/query/corporative/branch-find-many.query";
import { BranchResponseDto } from "../dto/response/branch.dto";
import { BranchFindManyQueryDto } from "../dto/query/branch_query.dto";
import { BranchModelMapper } from "../mapper/branch_model.mapper";

@ApiTags('Location', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('branches')
export class BranchReadController {
    constructor(
        @InjectQuery('BranchFindMany') private readonly findManyQuery: BranchFindManyQuery,
    ) { }

    @Get(':companyId')
    async findMany(
        @Param('companyId') companyId: string,
        @Query() query: BranchFindManyQueryDto
    ): Promise<BranchResponseDto[]> {
        const values = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined,
            companyId
        });
        const data = values.map(e => BranchModelMapper.toDTO(e));
        return plainToInstance(BranchResponseDto, data);
    }
}