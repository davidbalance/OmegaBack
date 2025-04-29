import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientRecordFindManyQuery } from "@omega/medical/application/queries/client/client-record-find-many.query";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { ClientRecordModelMapper } from "../mapper/client-record.model.mapper";
import { ClientRecordResponseDto } from "../dto/response/client.dto";
import { plainToInstance } from "class-transformer";
import { ClientReportQueryDto } from "../dto/query/client-query.dto";
import { ClientRecordFindOneQuery } from "@omega/medical/application/queries/client/client-record-find-one.query";
import { Response } from "express";
import { AuthGuard } from "@shared/shared/nest/guard";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-client/records')
export class RecordReadController {
    constructor(
        @InjectQuery('ClientRecordFindMany') private readonly findManyQuery: ClientRecordFindManyQuery,
        @InjectQuery('ClientRecordFindOne') private readonly findOneQuery: ClientRecordFindOneQuery,
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

    @Get('record/:recordId')
    async findOneRecordFile(
        @Param('recordId') recordId: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.findOneQuery.handleAsync({ recordId });
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="record.pdf"'
        });
        return new StreamableFile(buffer);
    }
}