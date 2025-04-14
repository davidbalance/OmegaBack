import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";
import { plainToInstance } from "class-transformer";
import { LogoFindManyQuery } from "@omega/auth/application/query/logo/logo-find-many.query";
import { LogoModelMapper } from "../mapper/logo_model.mapper";
import { LogoResponseDto } from "../dto/response/logo.dto";

@ApiTags('Auth', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('logos')
export class LogoReadController {
    constructor(
        @InjectQuery('LogoFindMany') private readonly logoFindMany: LogoFindManyQuery,
    ) { }

    @Get()
    async findMany(): Promise<LogoResponseDto[]> {
        const value = await this.logoFindMany.handleAsync();
        const data = value.map(e => LogoModelMapper.toDTO(e));
        return plainToInstance(LogoResponseDto, data);
    }

}