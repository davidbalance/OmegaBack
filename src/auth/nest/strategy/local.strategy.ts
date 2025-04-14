import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { InjectCommand } from '../inject/command.inject';
import { AuthValidateCommand } from '@omega/auth/application/command/auth/auth-validate.command';

export const LocalStrategyToken = 'local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalStrategyToken) {
    constructor(
        @InjectCommand('AuthValidate') private readonly authService: AuthValidateCommand
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<string> {
        return this.authService.handleAsync({ email, password });
    }
}