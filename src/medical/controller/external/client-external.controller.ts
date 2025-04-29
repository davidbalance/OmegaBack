import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ClientFindOneByDniQuery } from "@omega/medical/application/queries/client/client-find-one-by-dni.query";
import { CreatePatientFromExternalSourceService } from "@omega/medical/application/service/create-patient-from-external-source.service";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { InjectService } from "@omega/medical/nest/inject/service.inject";
import { ApiKeyGuard, OmegaApiKey } from "@shared/shared/nest/guard";
import { ClientModelMapper } from "../mapper/client.model-mapper";
import { plainToInstance } from "class-transformer";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { CreatePatientFromExternalSourceDto } from "../dto/request/client-external.dto";
import { ClientResponseDto } from "../dto/response/client.dto";

@ApiTags('Medical', 'External Connection')
@OmegaApiKey()
@UseGuards(ApiKeyGuard)
@Controller('external/patient')
export class ClientExternalController {
    constructor(
        @InjectQuery('ClientFindOneByDni') private readonly findOneByExternalKey: ClientFindOneByDniQuery,
        @InjectService('CreatePatientFromExternalSource') private readonly createByExternalSource: CreatePatientFromExternalSourceService,
    ) { }

    @Get(':patientDni')
    async findFromExternalSource(
        @Param('patientDni') patientDni: string
    ): Promise<ClientResponseDto> {
        const value = await this.findOneByExternalKey.handleAsync({ patientDni: patientDni });
        const data = ClientModelMapper.toDTO(value);
        return plainToInstance(ClientResponseDto, data);
    }

    @Post()
    async createFromExternalSource(
        @CurrentUser() app: string,
        @Body() body: CreatePatientFromExternalSourceDto
    ): Promise<ClientResponseDto> {
        const value = await this.createByExternalSource.createAsync({ ...body, owner: app });
        const data = ClientModelMapper.toDTO(value);
        return plainToInstance(ClientResponseDto, data);
    }
}