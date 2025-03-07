import { PaginationResponse } from "@shared/shared/nest/pagination_response";
import { Expose, Type } from "class-transformer";

export class ClientResponseDto {
    @Expose() public readonly patientDni: string;
    @Expose() public readonly patientName: string;
    @Expose() public readonly patientLastname: string;
    @Expose() public readonly patientBirthday: Date;
    @Expose() public readonly patientGender: 'male' | 'female';
    @Expose() public readonly patientRole: string | null;
    @Expose() public readonly companyRuc: string;
}

export class ClientManyResponseDto implements PaginationResponse<ClientResponseDto> {
    @Type(() => ClientResponseDto)
    @Expose() public readonly data: ClientResponseDto[];
    @Expose() public readonly amount: number;
}

export class ClientAreaResponseDto {
    @Expose() public readonly patientDni: string;
    @Expose() public readonly areaId: string | null;
    @Expose() public readonly areaName: string | null;
}

export class ClientEmailResponseDto {
    @Expose() public readonly emailId: string;
    @Expose() public readonly emailValue: string;
    @Expose() public readonly emailDefault: boolean;
    @Expose() public readonly patientDni: string;
}

export class ClientJobPositionResponseDto {
    @Expose() public readonly patientDni: string;
    @Expose() public readonly jobPosition: string | null;
}

export class ClientManagementResponseDto {
    @Expose() public readonly patientDni: string;
    @Expose() public readonly managementId: string | null;
    @Expose() public readonly managementName: string | null;
}

export class ClientRecordResponseDto {
    @Expose() public readonly recordId: string;
    @Expose() public readonly recordName: string;
    @Expose() public readonly recordEmissionDate: Date;
}