import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CorporativeGroupExternalConnectionService } from "../services/corporative-group-external-connection.service";
import { PostCorporativeGroupRequestDto } from "../dtos/request/post.corporative-group.dto";
import { PostCorporativeGroupResponseDto } from "../dtos/response/post.corporative-group.response.dto";
import { PatchCorporativeGroupRequestDto } from "../dtos/request/patch.corporative-group.dto";
import { PatchCorporativeGroupResponseDto } from "../dtos/response/patch.corporative-group.response.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

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
        @Body() body: PostCorporativeGroupRequestDto
    ): Promise<PostCorporativeGroupResponseDto> {
        const group = await this.service.create({ source, key }, body);
        return plainToInstance(PostCorporativeGroupResponseDto, group);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchCorporativeGroupRequestDto
    ): Promise<PatchCorporativeGroupResponseDto> {
        const group = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchCorporativeGroupResponseDto, group);
    }
}