import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { InjectQuery } from "@omega/medical/nest/inject/query.inject";
import { OrderCloudFindManyQuery } from "@omega/medical/application/queries/order/order-cloud-find-many.query";
import { OrderChecklistResponseDto, OrderCloudFileResponseDto, OrderDoctorManyResponseDto, OrderManyResponseDto, OrderPatientManyResponseDto, OrderResponseDto } from "../dto/response/order.dto";
import { OrderCloudFileModelMapper } from "../mapper/order-cloud-file.mapper";
import { OrderDoctorFindManyQuery } from "@omega/medical/application/queries/order/order-doctor-find-many.query";
import { DniInterceptor } from "@shared/shared/nest/interceptors/dni.interceptor";
import { CurrentUser } from "@shared/shared/nest/decorators/current-user.decorator";
import { OrderFindManyQueryDto, OrderPatientFindManyQueryDto } from "../dto/query/order-query.dto";
import { OrderModelMapper } from "../mapper/order.mapper";
import { OrderFindManyQuery } from "@omega/medical/application/queries/order/order.find-many.query";
import { OrderPatientFindManyQuery } from "@omega/medical/application/queries/order/order-patient.find-many.query";
import { OrderPatientModelMapper } from "../mapper/order-patient.mapper";
import { OrderChecklistFindManyQuery } from "@omega/medical/application/queries/order/order-checklist-find-many.query";
import { OrderChecklistModelMapper } from "../mapper/order-checklist.mapper";
import { OrderChecklistGetFileQuery } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { OrderFindOneQuery } from "@omega/medical/application/queries/order/order.find-one.query";
import { OrderDoctorModelMapper } from "../mapper/order-doctor.mapper";
import { Response } from "express";
import { OrderFindMassiveLoadTemplateQuery } from "@omega/medical/application/queries/order/order-find-massive-load-template.query";
import { Attribute } from "@shared/shared/nest/decorators/attribute.decorator";
import { AttributeInterceptor } from "@shared/shared/nest/interceptors/attribute.interceptor";

@ApiTags('Medical', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('medical-orders')
export class OrderReadController {
    constructor(
        @InjectQuery('OrderFindOne') private readonly findOneQuery: OrderFindOneQuery,
        @InjectQuery('OrderFindMany') private readonly findManyQuery: OrderFindManyQuery,
        @InjectQuery('OrderPatientFindMany') private readonly patientFindMany: OrderPatientFindManyQuery,
        @InjectQuery('OrderCloudFindMany') private readonly cloudFindManyQuery: OrderCloudFindManyQuery,
        @InjectQuery('OrderDoctorFindMany') private readonly doctorFindManyQuery: OrderDoctorFindManyQuery,
        @InjectQuery('OrderChecklistFindMany') private readonly checklistFindManyQuery: OrderChecklistFindManyQuery,
        @InjectQuery('OrderChecklistGetFile') private readonly checklistGetFileQuery: OrderChecklistGetFileQuery,
        @InjectQuery('OrderFindMassiveLoadTemplate') private readonly loadTemplate: OrderFindMassiveLoadTemplateQuery,
    ) { }

    @Get(':patientDni')
    async findManyOrders(
        @Param('patientDni') patientDni: string,
        @Query() query: OrderFindManyQueryDto
    ): Promise<OrderManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            patientDni,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => OrderModelMapper.toDTO(e));
        return plainToInstance(OrderManyResponseDto, { ...value, data });
    }

    @Get(':patientDni/eeq')
    async findManyOrdersFromEEQ(
        @Param('patientDni') patientDni: string,
        @Query() query: OrderFindManyQueryDto
    ): Promise<OrderManyResponseDto> {
        const companyRuc: string = '1790053881001';
        const value = await this.findManyQuery.handleAsync({
            ...query,
            patientDni,
            companyRuc,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => OrderModelMapper.toDTO(e));
        return plainToInstance(OrderManyResponseDto, { ...value, data });
    }

    @Attribute('look_for_company')
    @UseInterceptors(AttributeInterceptor)
    @Get(':patientDni/company')
    async findManyOrdersFromCompany(
        @Param('patientDni') patientDni: string,
        @CurrentUser() companyRuc: string,
        @Query() query: OrderFindManyQueryDto
    ): Promise<OrderManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query,
            patientDni,
            companyRuc,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => OrderModelMapper.toDTO(e));
        return plainToInstance(OrderManyResponseDto, { ...value, data });
    }

    @Get('order/:orderId')
    async findOne(
        @Param('orderId') orderId: string
    ): Promise<OrderResponseDto> {
        const value = await this.findOneQuery.handleAsync({ orderId });
        const data = OrderModelMapper.toDTO(value);
        return plainToInstance(OrderResponseDto, data);
    }

    @Get('orders/patient')
    async findManyPatientOrders(
        @Query() query: OrderPatientFindManyQueryDto
    ): Promise<OrderPatientManyResponseDto> {
        const value = await this.patientFindMany.handleAsync({
            ...query,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => OrderPatientModelMapper.toDTO(e));
        return plainToInstance(OrderPatientManyResponseDto, { ...value, data });
    }

    @Get('cloud/:orderId')
    async findCloudFiles(
        @Param('orderId') orderId: string
    ): Promise<OrderCloudFileResponseDto[]> {
        const values = await this.cloudFindManyQuery.handleAsync({ orderId });
        const data = values.map(e => OrderCloudFileModelMapper.toDTO(e));
        return plainToInstance(OrderCloudFileResponseDto, data);
    }

    @Get('checklist/:orderId')
    async findChecklist(
        @Param('orderId') orderId: string
    ): Promise<OrderChecklistResponseDto[]> {
        const values = await this.checklistFindManyQuery.handleAsync({ orderId });
        const data = values.map(e => OrderChecklistModelMapper.toDTO(e));
        return plainToInstance(OrderChecklistResponseDto, data);
    }

    @Get('checklist/:orderId/file')
    async findChecklistFile(
        @Param('orderId') orderId: string
    ): Promise<StreamableFile> {
        const buffer = await this.checklistGetFileQuery.handleAsync({ orderId });
        return new StreamableFile(buffer);
    }

    @UseInterceptors(DniInterceptor)
    @Get('doctor/:patientDni')
    async findManyDoctorOrders(
        @Param('patientDni') patientDni: string,
        @CurrentUser() doctorDni: string,
        @Query() query: OrderFindManyQueryDto
    ): Promise<OrderDoctorManyResponseDto> {
        const value = await this.doctorFindManyQuery.handleAsync({
            ...query,
            doctorDni,
            patientDni,
            order: query.orderField && query.orderValue ? { [query.orderField]: query.orderValue } : undefined
        });
        const data = value.data.map(e => OrderDoctorModelMapper.toDTO(e));
        return plainToInstance(OrderDoctorManyResponseDto, { ...value, data });
    }

    @Get('massive-load/template')
    async findMassiveLoadTemplate(
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.loadTemplate.handleAsync();
        response.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment;filename="massive_order_load_template.xlsx"'
        });
        return new StreamableFile(buffer);
    }
}