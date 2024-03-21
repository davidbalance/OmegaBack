import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UserCredentialService } from './user-credential/user-credential.service';
import { TokenService } from './token/token.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import { User } from '@/shared/decorator';
import { RefreshToken } from '@/shared';

@Controller('auth')
export class AuthenticationController {

    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@User() user: number): Promise<any> {
        return await this.tokenService.initToken(user);
    }

    @UseGuards(JwtRefreshGuard)
    @Post()
    async refresh(@User() token: RefreshToken): Promise<any> {
        return await this.tokenService.refreshToken(token);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async logout(@User() user: number) {
        await this.tokenService.removeToken(user);
    }
}
