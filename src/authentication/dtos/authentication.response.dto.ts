import { Expose } from "class-transformer";

export class AuthenticationResponseDto {
    @Expose()
    public readonly access: string;

    @Expose()
    public readonly refresh: string;
}