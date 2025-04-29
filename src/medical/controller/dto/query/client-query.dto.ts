import { ClientFindManyQueryPayload } from "@omega/medical/application/queries/client/client-find-many.query";
import { ClientDoctorFindManyQueryPayload } from "@omega/medical/application/queries/client/client-doctor-find-many.query";
import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min } from "class-validator";
import { ClientRecordFindManyQueryPayload } from "@omega/medical/application/queries/client/client-record-find-many.query";

export class ClientFindManyQueryDto implements OrderingQuery<ClientModel>, Omit<ClientFindManyQueryPayload, 'order' | 'companyRuc'> {
    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ClientModel;

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

export class ClientDoctorFindManyQueryDto implements OrderingQuery<ClientDoctorModel>, Omit<ClientDoctorFindManyQueryPayload, 'doctorDni' | 'order'> {
    @IsOptional()
    @IsString()
    public readonly orderField?: keyof ClientDoctorModel;

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

export class ClientReportQueryDto implements Omit<ClientRecordFindManyQueryPayload, 'patientDni'> {
    @IsString()
    @IsOptional()
    public readonly filter?: string | undefined;
}