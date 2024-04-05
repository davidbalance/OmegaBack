import { Body, Controller, Inject, Param, Patch, Post } from "@nestjs/common";
import { CGExternalConnectionService } from "./c-g-external-connection.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateCorporativeGroupExternalRequestDTO, FindCorporativeGroupAndUpdateRequestDTO } from "../dtos/c-g-external-connection.request.dto";
import { FindCorporativeGroupResponseDTO } from "../dtos";
import { plainToInstance } from "class-transformer";

@ApiTags('External Connections')
@Controller('corporative-group-external-connection')
export class CGExternalConnectionController {
    constructor(
        @Inject(CGExternalConnectionService) private readonly service: CGExternalConnectionService
    ) { }

    @Post(':source')
    async create(
        @Param('source') source: string,
        @Body() body: CreateCorporativeGroupExternalRequestDTO
    ): Promise<FindCorporativeGroupResponseDTO> {
        const group = await this.service.create({ ...body, source });
        return plainToInstance(FindCorporativeGroupResponseDTO, group);
    }

    @Patch(':source/:id')
    async findOneAndUpdate(
        @Param('source') source: string,
        @Param('id') id: string,
        @Body() body: FindCorporativeGroupAndUpdateRequestDTO
    ): Promise<FindCorporativeGroupResponseDTO> {
        const group = await this.service.findOneAndUpdate({ key: id, source }, body);
        return plainToInstance(FindCorporativeGroupResponseDTO, group);
    }
}