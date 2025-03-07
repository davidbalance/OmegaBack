import { Body, Controller, Delete, ForbiddenException, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthAddApiKeyCommand } from "@omega/auth/application/command/auth/auth-add-apikey.command";
import { AuthRemoveApiKeyCommand } from "@omega/auth/application/command/auth/auth-remove-apikey.command";
import { InjectCommand } from "@omega/auth/nest/inject/command.inject";
import { AuthAddApiKeyRequestDto } from "../dto/request/auth.dto";
import { JwtGuard } from "@shared/shared/nest/guard";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";
import { AuthIntrospectQuery } from "@omega/auth/application/query/auth/auth-introspect.query";

@ApiTags('Auth', 'Write')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('auth/write')
export class AuthWriteController {
    constructor(
        @InjectCommand('AuthAddApiKey') private readonly addApiKeyCommand: AuthAddApiKeyCommand,
        @InjectCommand('AuthRemoveApiKey') private readonly removeApiKeyCommand: AuthRemoveApiKeyCommand,
        @InjectQuery('AuthIntrospect') private readonly introspectCommand: AuthIntrospectQuery
    ) { }

    @Post('apikey')
    async addApiKey(
        @CurrentUser() jwt: string,
        @Body() body: AuthAddApiKeyRequestDto
    ): Promise<string> {
        const value = await this.introspectCommand.handleAsync({ jwt });
        if (value.active && value.sub) {
            const key = await this.addApiKeyCommand.handleAsync({
                ...body,
                authId: value.sub
            });
            return key;
        } else {
            throw new ForbiddenException();
        }
    }

    @Delete('apikey/:apikeyId')
    async removeApiKey(
        @CurrentUser() jwt: string,
        @Param('apikeyId') apikeyId: string
    ): Promise<string> {
        const value = await this.introspectCommand.handleAsync({ jwt });
        if (value.active && value.sub) {
            await this.removeApiKeyCommand.handleAsync({ apikeyId, authId: value.sub });
        } else {
            throw new ForbiddenException();
        }
        return "ok";
    }
}