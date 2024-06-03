import { Expose } from "class-transformer";

export class HealthCheckResponseDTO {
    @Expose()
    health: string;
}