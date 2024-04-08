import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { User } from '@/shared/decorator';
import { RefreshToken } from './token/types';
import { AuthenticationResponseDTO } from './dtos';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards';
import { JwtAuthGuard, JwtRefreshGuard } from '@/shared/guards/authentication-guard/guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {

    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: number): Promise<AuthenticationResponseDTO> {
        const tokens = await this.tokenService.initToken(user);
        return plainToInstance(AuthenticationResponseDTO, tokens);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@User() token: RefreshToken): Promise<AuthenticationResponseDTO> {
        const tokens = await this.tokenService.refreshToken(token);
        return plainToInstance(AuthenticationResponseDTO, tokens);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@User() user: number): Promise<any> {
        await this.tokenService.removeToken(user);
        return {};
    }
}
