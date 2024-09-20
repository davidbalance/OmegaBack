import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { PostBranchExternalRequestDto } from "../dtos/request/external-branch.post.dto";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards/api-key-auth.guard";
import { PostExtendedBranchResponseDto } from "../dtos/response/extended-branch.post.dto";
import { PatchExtendedBranchResponseDto } from "../dtos/response/extended-branch.patch.dto";
import { PatchCompanyExternalRequestDto } from "@/location/company/dtos/request/external-company.patch.dto";
import { PatchBranchExternalRequestDto } from "../dtos/request/external-branch.patch.dto";

@ApiTags('Location>Branch', 'External Connection')
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
    ): Promise<PostExtendedBranchResponseDto> {
        const branch = await this.service.findOneOrCreate({ source, key }, body);
        return plainToInstance(PostExtendedBranchResponseDto, branch);
    }

    @Patch()
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PatchBranchExternalRequestDto,
    ): Promise<PatchExtendedBranchResponseDto> {
        const branch = await this.service.findOneAndUpdate({ key, source }, body);
        return plainToInstance(PatchExtendedBranchResponseDto, branch);
    }
}