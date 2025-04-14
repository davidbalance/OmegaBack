import { BranchFindManyQueryPayload } from "@omega/location/application/query/corporative/branch-find-many.query";
import { BranchModel } from "@prisma/client";
import { OrderingQuery } from "@shared/shared/nest/pagination_response";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class BranchFindManyQueryDto implements OrderingQuery<BranchModel>, Omit<BranchFindManyQueryPayload, 'companyId'> {
    @IsOptional()
    @IsString()
    public readonly filter?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly orderField?: keyof BranchModel;

    @IsOptional()
    @IsEnum({ asc: 'asc', desc: 'desc' })
    public readonly orderValue?: "asc" | "desc";
}