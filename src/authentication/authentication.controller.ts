import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import { User } from '@/shared/decorator';
import { RefreshToken } from './token/types';

@Controller('auth')
export class AuthenticationController {

    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @User() user: number): Promise<any> {
        return await this.tokenService.initToken(user);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@User() token: RefreshToken): Promise<any> {
        return await this.tokenService.refreshToken(token);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@User() user: number) {
        await this.tokenService.removeToken(user);
        return { msg: "Successfully logged out" };
    }
}