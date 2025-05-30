import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientDoctorFindManyQuery } from "@omega/medical/application/queries/client/client-doctor-find-many.query";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { DniInterceptor } from "@shared/shared/nest/interceptors/dni.interceptor";
import { ClientAreaResponseDto, ClientEmailResponseDto, ClientJobPositionResponseDto, ClientManagementResponseDto, ClientManyResponseDto, ClientResponseDto } from "../dto/response/client.dto";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { ClientDoctorFindManyQueryDto, ClientFindManyQueryDto } from "../dto/query/client-query.dto";
import { plainToInstance } from "class-transformer";
import { ClientEmailFindManyQuery } from "@omega/medical/application/queries/client/client-email-find-many.query";
import { ClientEmailModelMapper } from "../mapper/client-email.model-mapper";
import { ClientAreaFindOneQuery } from "@omega/medical/application/queries/client/client-area-find-one.query";
import { ClientAreaModelMapper } from "../mapper/client-area.model-mapper";
import { ClientJobPositionFindOneQuery } from "@omega/medical/application/queries/client/client-job-position-find-one.query";
import { ClientJobPositionModelMapper } from "../mapper/client-job-position.model-mapper";
import { ClientManagementModelMapper } from "../mapper/client-management.model-mapper";
import { ClientManagementFindOneQuery } from "@omega/medical/application/queries/client/client-management-find-one.query";
import { ClientFindManyQuery } from "@omega/medical/application/queries/client/client-find-many.query";
import { ClientModelMapper } from "../mapper/client.model-mapper";
import { AttributeInterceptor } from "@shared/shared/nest/interceptors/attribute.interceptor";
import { Attribute } from "@shared/shared/nest/decorators/attribute.decorator";
import { ClientFindOneByDniQuery } from "@omega/medical/application/queries/client/client-find-one-by-dni.query";
import { Response } from "express";
import { ClientFindMassiveLoadTemplateQuery } from "@omega/medical/application/queries/client/client-find-massive-load-template.query";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-clients')
export class ClientReadController {
    constructor(
        @InjectQuery('ClientFindMany') private readonly findManyQuery: ClientFindManyQuery,
        @InjectQuery('ClientFindOneByDni') private readonly findOneByDni: ClientFindOneByDniQuery,
        @InjectQuery('ClientDoctorFindMany') private readonly doctorfindManyQuery: ClientDoctorFindManyQuery,
        @InjectQuery('ClientEmailFindMany') private readonly emailFindManyQuery: ClientEmailFindManyQuery,
        @InjectQuery('ClientAreaFindOne') private readonly areaFindOneQuery: ClientAreaFindOneQuery,
        @InjectQuery('ClientJobPositionFindOne') private readonly jobPositionFindOneQuery: ClientJobPositionFindOneQuery,
        @InjectQuery('ClientManagementFindOne') private readonly managementFindOneQuery: ClientManagementFindOneQuery,
        @InjectQuery('ClientFindMassiveLoadTemplate') private readonly loadTemplate: ClientFindMassiveLoadTemplateQuery,
    ) { }

    @Get(':dni/patient')
    async findOneClientByDni(
        @Param('dni') patientDni: string
    ): Promise<ClientResponseDto> {
        const value = await this.findOneByDni.handleAsync({ patientDni });
        const data = ClientModelMapper.toDTO(value);
        return plainToInstance(ClientResponseDto, data);
    }

    @Get()
    async findManyClient(
        @Query() query: ClientFindManyQueryDto
    ): Promise<ClientManyResponseDto> {

        const values = await this.findManyQuery.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.data.map(e => ClientModelMapper.toDTO(e));
        return plainToInstance(ClientManyResponseDto, { ...values, data });
    }

    @Attribute('look_for_company')
    @UseInterceptors(AttributeInterceptor)
    @Get('company')
    async findManyClientByCompany(
        @CurrentUser() companyRuc: string,
        @Query() query: ClientFindManyQueryDto
    ): Promise<ClientManyResponseDto> {
        const values = await this.findManyQuery.handleAsync({
            ...query,
            companyRuc,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.data.map(e => ClientModelMapper.toDTO(e));
        return plainToInstance(ClientManyResponseDto, { ...values, data });
    }

    @Get('eeq')
    async findManyClientEEQ(
        @Query() query: ClientFindManyQueryDto
    ): Promise<ClientManyResponseDto> {
        const companyRuc: string = '1790053881001';
        const values = await this.findManyQuery.handleAsync({
            ...query,
            companyRuc,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = values.data.map(e => ClientModelMapper.toDTO(e));
        return plainToInstance(ClientManyResponseDto, { ...values, data });
    }

    @UseInterceptors(DniInterceptor)
    @Get('doctor')
    async findManyClientByDoctor(
        @CurrentUser() doctorDni: string,
        @Query() query: ClientDoctorFindManyQueryDto
    ): Promise<ClientManyResponseDto> {
        const value = await this.doctorfindManyQuery.handleAsync({
            ...query,
            doctorDni: doctorDni,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => ClientModelMapper.toDTO(e));
        return plainToInstance(ClientManyResponseDto, { ...value, data });
    }

    @Get(':dni/emails')
    async findManyEmails(
        @Param('dni') dni: string
    ): Promise<ClientEmailResponseDto[]> {
        const values = await this.emailFindManyQuery.handleAsync({ patientDni: dni });
        const data = values.map(e => ClientEmailModelMapper.toDTO(e));
        return plainToInstance(ClientEmailResponseDto, data);
    }

    @Get(':dni/area')
    async findOneArea(
        @Param('dni') dni: string
    ): Promise<ClientAreaResponseDto> {
        const value = await this.areaFindOneQuery.handleAsync({ patientDni: dni });
        const data = ClientAreaModelMapper.toDTO(value);
        return plainToInstance(ClientAreaResponseDto, data);
    }

    @Get(':dni/job-position')
    async findOneJobPosition(
        @Param('dni') dni: string
    ): Promise<ClientJobPositionResponseDto> {
        const value = await this.jobPositionFindOneQuery.handleAsync({ patientDni: dni });
        const data = ClientJobPositionModelMapper.toDTO(value);
        return plainToInstance(ClientJobPositionResponseDto, data);
    }

    @Get(':dni/management')
    async findOneManagement(
        @Param('dni') dni: string
    ): Promise<ClientManagementResponseDto> {
        const value = await this.managementFindOneQuery.handleAsync({ patientDni: dni });
        const data = ClientManagementModelMapper.toDTO(value);
        return plainToInstance(ClientManagementResponseDto, data);
    }

    @Get('massive-load/template')
    async findMassiveLoadTemplate(
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.loadTemplate.handleAsync();
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment;filename="massive_patient_load_template.xlsx"'
        });
        return new StreamableFile(buffer);
    }
}