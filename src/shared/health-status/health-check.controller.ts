import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResponseDto } from './health-check.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags("Health/Check")
@Controller('health/check')
export class HealthCheckController {
    @Get()
    public healthCheck(): HealthCheckResponseDto {
        return plainToInstance(HealthCheckResponseDto, { health: 'ok' });
    }
}
