import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { PATCHBranchRequestDto, PATCHBranchResponseDto } from "../dtos/patch.branch.dto";
import { POSTBranchRequestDto, POSTBranchResponseDto } from "../dtos/post.branch.dto";

@ApiTags('Location/Branch', 'External/Connection')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('external/connection/branch/:source')
export class BranchExternalConnectionController {
    constructor(
        @Inject(BranchExternalConnectionService) private readonly service: BranchExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post()
    async create(
        @Param('source') source: string,
        @Body() body: POSTBranchRequestDto,
    ): Promise<POSTBranchResponseDto> {
        const branch = await this.service.create({ source, ...body });
        return plainToInstance(POSTBranchResponseDto, branch);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':key')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('key') key: string,
        @Body() body: PATCHBranchRequestDto,
    ): Promise<PATCHBranchResponseDto> {
        const branch = await this.service.findOneAndUpdate({ key: key, source: source }, body);
        return plainToInstance(PATCHBranchResponseDto, branch);
    }
}