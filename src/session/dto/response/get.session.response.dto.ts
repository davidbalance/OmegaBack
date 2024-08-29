import { Expose } from "class-transformer";

export class GetSessionResponseDto {
    @Expose()
    public readonly token: string;

    @Expose()
    public readonly refresh: string;
}