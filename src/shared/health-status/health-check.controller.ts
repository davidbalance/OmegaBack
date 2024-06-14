import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResponseDTO } from './health-check.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags("Health/Check")
@Controller('health/check')
export class HealthCheckController {
    @Get()
    public healthCheck(): HealthCheckResponseDTO {
        return plainToInstance(HealthCheckResponseDTO, { health: 'ok' });
    }
}
