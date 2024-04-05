import { Body, Controller, Inject, Param, Patch, Post } from "@nestjs/common";
import { BranchExternalConnectionService } from "./branch-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateBranchExternalRequestDTO, FindBranchResponseDTO, FindOneBranchExternalAndUpdateRequestDTO } from "../dtos";
import { plainToInstance } from "class-transformer";

@ApiTags('External Connections')
@Controller('branch-external-connection')
export class BranchExternalConnectionController {
    constructor(
        @Inject(BranchExternalConnectionService) private readonly service: BranchExternalConnectionService
    ) { }

    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: CreateBranchExternalRequestDTO,
    ): Promise<FindBranchResponseDTO> {
        const branch = await this.service.create({ source, ...body });
        return plainToInstance(FindBranchResponseDTO, branch);
    }

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