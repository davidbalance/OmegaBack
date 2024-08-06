import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserCredentialValidatorService } from "../user-credential/services/user-credential-validator.service";

export class LocalAuthStrategy extends PassportStrategy(Strategy, 'local-auth') {
    constructor(
        @Inject(UserCredentialValidatorService) private readonly authentication: UserCredentialValidatorService
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<number> {
        const user = await this.authentication.validate(username, password);
        if (!user) {
            throw new UnauthorizedException(["Invalid credentials"]);
        }
        return user;
    }
}