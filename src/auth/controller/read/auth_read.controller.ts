import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthIntrospectQuery } from "@omega/auth/application/query/auth/auth-introspect.query";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { JwtGuard } from "@shared/shared/nest/guard";
import { IntrospectResponseDto } from "../dto/response/login.dto";
import { IntrospectMapper } from "../mapper/introspect.mapper";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";

@ApiTags('Auth', 'Read')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('auth')
export class AuthReadController {
    constructor(
        @InjectQuery('AuthIntrospect') private readonly introspectCommand: AuthIntrospectQuery,
    ) { }

    @Get('introspect')
    async introspect(
        @CurrentUser() jwt: string
    ): Promise<IntrospectResponseDto> {
        const value = await this.introspectCommand.handleAsync({ jwt });
        const data = IntrospectMapper.toDTO(value);
        return plainToInstance(IntrospectResponseDto, data);
    }
}