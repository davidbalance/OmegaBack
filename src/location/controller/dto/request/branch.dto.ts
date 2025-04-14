import { BranchCreateCommandPayload } from "@omega/location/application/command/corporative/branch-create.command";
import { BranchMoveCommandPayload } from "@omega/location/application/command/corporative/branch-move.command";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class BranchCreateRequestDto implements BranchCreateCommandPayload {
    @IsUUID()
    public readonly corporativeId: string;

    @Type(() => Number)
    @IsNumber()
    public readonly cityId: number;

    @IsUUID()
    public readonly companyId: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class BranchMoveRequestDto implements Omit<BranchMoveCommandPayload, 'fromCorporativeId' | 'fromCompanyId' | 'branchId'> {
    @IsUUID()
    public readonly toCorporativeId: string;

    @IsUUID()
    public readonly toCompanyId: string;
}