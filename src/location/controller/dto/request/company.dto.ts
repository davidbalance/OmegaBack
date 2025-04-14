import { CompanyCreateCommandPayload } from "@omega/location/application/command/corporative/company-create.command";
import { CompanyMoveCommandPayload } from "@omega/location/application/command/corporative/company-move.command";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class CompanyCreateRequestDto implements CompanyCreateCommandPayload {
    @IsUUID()
    public readonly corporativeId: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    public readonly ruc: string;

    @IsString()
    public readonly address: string;

    @IsString()
    public readonly phone: string;
}

export class CompanyMoveRequestDto implements Omit<CompanyMoveCommandPayload, 'fromCorporativeId' | 'companyId'> {
    @IsUUID()
    public readonly toCorporativeId: string;
}