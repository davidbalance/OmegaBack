import { Expose } from "class-transformer";

export class HealthCheckResponseDto {
    @Expose()
    health: string;
}