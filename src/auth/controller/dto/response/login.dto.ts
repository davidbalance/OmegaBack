import { AuthIntrospect } from "@omega/auth/application/type/auth.type";
import { Expose, Type } from "class-transformer";

export class LoginResponseDto {
    @Expose() public readonly accessToken: string;
    @Expose() public readonly refreshToken: string;
}

class AuthResourceResponseDto {
    @Expose() public readonly label: string;
    @Expose() public readonly address: string;
    @Expose() public readonly icon: string;
}
export class IntrospectResponseDto implements AuthIntrospect {
    @Expose() public readonly sub?: string;
    @Expose() public readonly email?: string;
    @Expose() public readonly name?: string;
    @Expose() public readonly lastname?: string;
    @Expose() public readonly logo?: string | null;

    @Type(() => AuthResourceResponseDto)
    @Expose() public readonly resources?: AuthResourceResponseDto[];

    @Expose() public readonly active: boolean;
}