import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { PostBranchResponseDto } from "../dtos/response/post.branch.response.dto";
import { PatchBranchRequestDto } from "../dtos/request/patch.branch.request.dto";
import { PatchBranchResponseDto } from "../dtos/response/patch.branch.response.dto";
import { PostBranchExternalRequestDto } from "../dtos/request/post.branch-external.request.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";

@ApiTags('Location/Branch', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@UseGuards(ApiKeyAuthGuard)
@Controller('external/connection/branch/:source/:key')
export class BranchExternalConnectionController {
    constructor(
        @Inject(BranchExternalConnectionService) private readonly service: BranchExternalConnectionService
    ) { }

    @Post()
    async create(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PostBranchExternalRequestDto,
    ): Promise<PostBranchResponseDto> {
        const branch = await this.service.create({ source, key }, body);
        return plainToInstance(PostBranchResponseDto, branch);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchBranchRequestDto,
    ): Promise<PatchBranchResponseDto> {
        const branch = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchBranchResponseDto, branch);
    }
}