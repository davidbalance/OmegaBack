import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Health Status")
@Controller('health-status')
export class HealthStatusController {
    @Get()
    public healthStatus() {
        return "Ok"
    }
}
