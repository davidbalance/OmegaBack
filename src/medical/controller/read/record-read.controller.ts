import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientRecordFindManyQuery } from "@omega/medical/application/queries/client/client-record-find-many.query";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { ClientRecordModelMapper } from "../mapper/client-record.model.mapper";
import { ClientRecordMetadataResponseDto, ClientRecordResponseDto } from "../dto/response/client.dto";
import { plainToInstance } from "class-transformer";
import { ClientReportQueryDto } from "../dto/query/client-query.dto";
import { ClientRecordFindOneFileQuery } from "@omega/medical/application/queries/client/client-record-find-one-file.query";
import { Response } from "express";
import { AuthGuard } from "@shared/shared/nest/guard";
import { ClientRecordFindOneMetadataQuery } from "@omega/medical/application/queries/client/client-record-find-one-metadata.query";
import { ClientRecordMetadataMapper } from "../mapper/client-record-metadata.mapper";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-client/records')
export class RecordReadController {
    constructor(
        @InjectQuery('ClientRecordFindMany') private readonly findManyQuery: ClientRecordFindManyQuery,
        @InjectQuery('ClientRecordFindOneFile') private readonly findOneFileQuery: ClientRecordFindOneFileQuery,
        @InjectQuery('ClientRecordFindOneMetadata') private readonly findOneMetadataQuery: ClientRecordFindOneMetadataQuery,
    ) { }

    @Get(':patientDni')
    async findManyRecords(
        @Param('patientDni') patientDni: string,
        @Query() query: ClientReportQueryDto
    ): Promise<ClientRecordResponseDto[]> {
        const values = await this.findManyQuery.handleAsync({
            ...query,
            patientDni
        });
        const data = values.map(e => ClientRecordModelMapper.toDTO(e));
        return plainToInstance(ClientRecordResponseDto, data);
    }

    @Get('record/:recordId/file')
    async findOneRecordFile(
        @Param('recordId') recordId: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer: Buffer = await this.findOneFileQuery.handleAsync({ recordId });
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="record.pdf"'
        });
        return new StreamableFile(buffer);
    }

    @Get('record/:recordId/metadata')
    async findOneRecordMetadata(
        @Param('recordId') recordId: string,
    ): Promise<ClientRecordMetadataResponseDto> {
        const value = await this.findOneMetadataQuery.handleAsync({ recordId });
        const data = ClientRecordMetadataMapper.toDTO(value);
        return plainToInstance(ClientRecordMetadataResponseDto, data);
    }
}