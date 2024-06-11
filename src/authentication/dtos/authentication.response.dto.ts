import { Expose } from "class-transformer";

export class AuthenticationResponseDTO {
    @Expose()
    public readonly access: string;

    @Expose()
    public readonly refresh: string;

    @Expose()
    public readonly expiresAt: Date;
}