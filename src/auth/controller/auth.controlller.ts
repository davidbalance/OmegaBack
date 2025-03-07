import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthAccessTokenCommand } from "@omega/auth/application/command/auth/auth-access-token.command";
import { InjectCommand } from "@omega/auth/nest/inject/command.inject";
import { CurrentUser } from "@shared/shared/nest/decorators/current_user.decorator";
import { LoginResponseDto } from "./dto/response/login.dto";
import { LoginMapper } from "./mapper/login.mapper";
import { plainToInstance } from "class-transformer";
import { AuthRefreshTokenCommand } from "../application/command/auth/auth-refresh-token.command";
import { JwtGuard } from "@shared/shared/nest/guard";
import { AuthRemoveTokenCommand } from "../application/command/auth/auth-remove-token.command";
import { AuthEditPassword, LoginRequestDto } from "./dto/request/auth.dto";
import { LocalGuard } from "../nest/guards/local.guard";
import { AuthEditPasswordCommand } from "../application/command/auth/auth-edit-password.command";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @InjectCommand('AuthAccessToken') private readonly accessTokenCommand: AuthAccessTokenCommand,
        @InjectCommand('AuthRefreshToken') private readonly refreshTokenCommand: AuthRefreshTokenCommand,
        @InjectCommand('AuthRemoveToken') private readonly removeTokenCommand: AuthRemoveTokenCommand,
        @InjectCommand('AuthEdit') private readonly authEditCommand: AuthEditPasswordCommand,
    ) { }

    @ApiBody({ schema: { type: typeof LoginRequestDto } })
    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @CurrentUser() authId: string,
    ): Promise<LoginResponseDto> {
        const token = await this.accessTokenCommand.handleAsync({ authId });
        const data = LoginMapper.toDTO(token);
        return plainToInstance(LoginResponseDto, data);
    }

    @UseGuards(JwtGuard)
    @Post('refresh')
    async refresh(
        @CurrentUser() jwt: string
    ): Promise<LoginResponseDto> {
        const token = await this.refreshTokenCommand.handleAsync({ jwt });
        const data = LoginMapper.toDTO(token);
        return plainToInstance(LoginResponseDto, data);
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    async logout(
        @CurrentUser() token: string
    ): Promise<string> {
        await this.removeTokenCommand.handleAsync({ token });
        return "logged out";
    }

    @Put('password')
    async editPassword(
        @Body() body: AuthEditPassword
    ): Promise<string> {
        await this.authEditCommand.handleAsync(body);
        return "logged out";
    }
}