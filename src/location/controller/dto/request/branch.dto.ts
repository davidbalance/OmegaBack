import { BranchCreateCommandPayload } from "@omega/location/application/command/corporative/branch-create.command";
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