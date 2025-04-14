import { OrderPatientFindManyQueryPayload } from "@omega/medical/application/queries/order/order-patient.find-many.query";
import { OrderFindManyQueryPayload } from "@omega/medical/application/queries/order/order.find-many.query";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";

export class OrderFindManyQueryDto implements OrderingQuery<OrderModel>, Omit<OrderFindManyQueryPayload, 'patientDni'> {
    @IsString()
    @IsOptional()
    public readonly filter?: string;

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof OrderModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";
}

export class OrderPatientFindManyQueryDto implements OrderingQuery<OrderPatientModel>, Omit<OrderPatientFindManyQueryPayload, 'order'> {

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof OrderPatientModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";

    @IsString()
    @IsOptional()
    public readonly filter?: string;

    @Type(() => Number)
    @Min(0)
    public readonly skip: number;

    @Type(() => Number)
    @Min(10)
    public readonly limit: number;
}