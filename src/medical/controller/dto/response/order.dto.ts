import { ApiResponseProperty } from "@nestjs/swagger";
import { OrderStatus } from "@omega/medical/core/domain/order/order.domain";
import { PaginationResponse } from "@shared/shared/nest/pagination_response";
import { Expose, Type } from "class-transformer";

export class OrderCloudFileResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly patientDni: string;
    @Expose() public readonly patientFullname: string;
    @Expose() public readonly examName: string;
    @Expose() public readonly resultHasFile: boolean;
    @Expose() public readonly reportHasContent: boolean;
}

export class OrderResponseDto {
    @Expose() public readonly orderId: string;
    @Expose() public readonly orderMail: boolean;
    @Expose() public readonly orderProcess: string;
    @Expose() public readonly orderEmissionDate: Date;

    @ApiResponseProperty({ enum: { created: 'created', validated: 'validated' } as Record<OrderStatus, string> })
    @Expose() public readonly orderStatus: OrderStatus;
}

export class OrderManyResponseDto implements PaginationResponse<OrderPatientResponseDto> {
    @Type(() => OrderPatientResponseDto)
    @Expose() public readonly data: OrderPatientResponseDto[];
    @Expose() public readonly amount: number;
}


export class OrderDoctorResponseDto extends OrderResponseDto {
    @Expose() public readonly orderLeftReport: number;
}

export class OrderDoctorManyResponseDto implements PaginationResponse<OrderDoctorResponseDto> {
    @Type(() => OrderDoctorResponseDto)
    @Expose() public readonly data: OrderDoctorResponseDto[];
    @Expose() public readonly amount: number;
}


export class OrderPatientResponseDto extends OrderResponseDto {
    @Expose() public readonly patientName: string;
    @Expose() public readonly patientLastname: string;
    @Expose() public readonly patientDni: string;
    @Expose() public readonly locationCorporative: string;
    @Expose() public readonly locationCompanyRuc: string;
    @Expose() public readonly locationCompanyName: string;
    @Expose() public readonly locationBranchName: string;
}

export class OrderPatientManyResponseDto implements PaginationResponse<OrderPatientResponseDto> {
    @Type(() => OrderPatientResponseDto)
    @Expose() public readonly data: OrderPatientResponseDto[];
    @Expose() public readonly amount: number;
}

export class OrderProcessResponseDto {
    @Expose() public readonly orderProcess: string;
}

export class OrderYearResponseDto {
    @Expose() public readonly orderYear: number;
}

export class OrderChecklistResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly testCheck: boolean;
    @Expose() public readonly examName: string;
    @Expose() public readonly patientDni: string;
    @Expose() public readonly patientName: string;
    @Expose() public readonly patientLastname: string;
    @Expose() public readonly orderId: string;
    @Expose() public readonly orderProcess: string;
    @Expose() public readonly orderEmissionDate: Date;
    @Expose() public readonly locationCompanyRuc: string;
    @Expose() public readonly locationCompanyName: string;
    @Expose() public readonly locationJobPosition: string | null | undefined;
}