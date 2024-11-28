import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { PostMedicalClientRequestDto } from "../dtos/request/medical-client.post.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { MedicalClientLocalService } from "../services/medical-client-local.service";

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
        @Body() data: PostMedicalClientRequestDto
    ): Promise<any> {
        await this.service.create(data);
        return "";
    }

}