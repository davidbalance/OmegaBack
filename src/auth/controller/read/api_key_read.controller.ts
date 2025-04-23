import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { JwtGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";
import { ApiKeyResponseDto } from "../dto/response/api_key.dto";
import { ApiKeyFindManyQuery } from "@omega/auth/application/query/auth/api-key-find-many.query";
import { ApiKeyMapper } from "../mapper/api_key.mapper";

@ApiTags('Auth', 'Read')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api-keys')
export class ApiKeyReadController {
    constructor(
        @InjectQuery('ApiKeyFindMany') private readonly findManyQuery: ApiKeyFindManyQuery,
    ) { }

    @Get()
    async findMany(
        @CurrentUser() jwt: string
    ): Promise<ApiKeyResponseDto[]> {
        const values = await this.findManyQuery.handleAsync({ jwt });
        const data = values.map(e => ApiKeyMapper.toDTO(e));
        return plainToInstance(ApiKeyResponseDto, data);
    }
}