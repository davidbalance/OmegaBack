import { Expose, Type } from "class-transformer";
import { TokenPayload } from "../token/token.service";

export class TokenDTO implements TokenPayload {
    @Expose()
    token: string;

    @Expose()
    expiresAt: Date;
}

export class AuthenticationResponseDTO {
    @Type(() => TokenDTO)
    @Expose()
    public readonly access: TokenDTO;
    
    @Type(() => TokenDTO)
    @Expose()
    public readonly refresh: TokenDTO;
}