import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Heart Beat')
@Controller('heart-beat')
export class HeartBeatController {
    @Get()
    heartBeat(): string {
        return 'Healthy'
    }
}