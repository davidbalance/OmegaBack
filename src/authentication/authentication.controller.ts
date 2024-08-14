import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token/services/token.service';
import { User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshToken } from './token/types/refresh-token.type';
import { AuthenticationResponseDto } from './dtos/authentication.response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {

    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: number): Promise<AuthenticationResponseDto> {
        const tokens = await this.tokenService.initToken(user);
        return plainToInstance(AuthenticationResponseDto, tokens);
    }

    @ApiBearerAuth()
    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@User() token: RefreshToken): Promise<AuthenticationResponseDto> {
        const tokens = await this.tokenService.refreshToken(token);
        return plainToInstance(AuthenticationResponseDto, tokens);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@User() user: number): Promise<any> {
        await this.tokenService.removeToken(user);
        return {};
    }
}
