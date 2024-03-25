import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserCredentialService } from "../user-credential/user-credential.service";

export class LocalAuthStrategy extends PassportStrategy(Strategy, 'local-auth') {
    constructor(
        @Inject(UserCredentialService) private readonly authentication: UserCredentialService
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<number> {
        const user = await this.authentication.validateCredentials(username, password);
        if (!user) {
            throw new UnauthorizedException(["Invalid credentials"]);
        }
        return user;
    }
}