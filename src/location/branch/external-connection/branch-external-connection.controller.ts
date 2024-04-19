import { Body, Controller, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BranchExternalConnectionService } from "./branch-external-connection.service";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { CreateBranchExternalRequestDTO, FindBranchResponseDTO, FindOneBranchExternalAndUpdateRequestDTO } from "../dtos";
import { plainToInstance } from "class-transformer";
import { ApiKeyAuthGuard } from "@/shared/guards/api-key-guard/guards";

@ApiTags('External Connections')
@ApiHeader({ name: 'x-api-key', allowEmptyValue: false, required: true })
@Controller('branch-external-connection')
export class BranchExternalConnectionController {
    constructor(
        @Inject(BranchExternalConnectionService) private readonly service: BranchExternalConnectionService
    ) { }

    @UseGuards(ApiKeyAuthGuard)
    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: CreateBranchExternalRequestDTO,
    ): Promise<FindBranchResponseDTO> {
        const branch = await this.service.create({ source, ...body });
        return plainToInstance(FindBranchResponseDTO, branch);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: FindOneBranchExternalAndUpdateRequestDTO,
    ): Promise<FindBranchResponseDTO> {
        const branch = await this.service.findOneAndUpdate({ key: id, source: source }, body);
        return plainToInstance(FindBranchResponseDTO, branch);
    }
}