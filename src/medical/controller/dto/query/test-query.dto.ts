import { TestFindManyQueryPayload } from "@omega/medical/application/queries/test/test-find-many.query";
import { TestReportGetFileQueryPayload } from "@omega/medical/application/queries/test/test-report-get-file.query";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { OrderingQuery } from "@shared/shared/nest/pagination-response";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class TestReportGetFileQueryDto implements TestReportGetFileQueryPayload {
    @IsOptional()
    @IsString()
    public readonly locationCorporative?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly locationCompany?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    public readonly orderYear?: number | undefined;
}

export class TestQueryDto implements OrderingQuery<TestModel>, Omit<TestFindManyQueryPayload, 'orderId' | 'order'> {
    @IsString()
    @IsOptional()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof TestModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";
}