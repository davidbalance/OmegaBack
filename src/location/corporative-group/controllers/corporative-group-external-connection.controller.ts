import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CorporativeGroupExternalConnectionService } from "../services/corporative-group-external-connection.service";
import { PostExtendedCorporativeGroupResponseDto } from "../dtos/response/extended-corporative-group.post.dto";
import { PatchExtendedCorporativeGroupResponseDto } from "../dtos/response/extended-corporative-group.patch.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.post.dto";
import { PatchExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.patch.dto";

@ApiTags('Location/Corporative/Group', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/corporative/groups/:source/:key')
export class CorporativeGroupExternalConnectionController {
    constructor(
        @Inject(CorporativeGroupExternalConnectionService) private readonly service: CorporativeGroupExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostExternalCorporativeGroupRequestDto
    ): Promise<PostExtendedCorporativeGroupResponseDto> {
        const group = await this.service.create({ source, key }, body);
        return plainToInstance(PostExtendedCorporativeGroupResponseDto, group);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchExternalCorporativeGroupRequestDto
    ): Promise<PatchExtendedCorporativeGroupResponseDto> {
        const group = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchExtendedCorporativeGroupResponseDto, group);
    }
}