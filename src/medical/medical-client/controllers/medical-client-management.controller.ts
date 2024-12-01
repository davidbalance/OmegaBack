import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MedicalClientLocalService } from "../services/medical-client-local.service";
import { PostLocalMedicalClientRequestDto } from "../dtos/request/local-medical-client.post.dto";

@ApiTags('Medical>Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client')
export class MedicalClientManagementController {

    constructor(
        @Inject(MedicalClientLocalService) private readonly service: MedicalClientLocalService,
    ) { }

    @Post()
    async create(
        @Body() data: PostLocalMedicalClientRequestDto
    ): Promise<any> {
        await this.service.create(data);
        return "";
    }

}