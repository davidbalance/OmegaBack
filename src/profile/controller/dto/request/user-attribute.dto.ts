import { AddCompanyFilterCommandPayload } from "@omega/profile/application/command/user/add-company-filter.command";
import { AddCorporativeFilterCommandPayload } from "@omega/profile/application/command/user/add-corporative-filter.command";
import { UserAddAttributeCommandPayload } from "@omega/profile/application/command/user/user-add-attribute.command";
import { IsNotEmpty, IsString, IsUUID, Length, MaxLength } from "class-validator";

export class UserAddAttributeRequestDto implements UserAddAttributeCommandPayload {
    @IsUUID()
    public readonly userId: string;

    @IsString()
    @IsNotEmpty()
    public readonly attributeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly attributeValue: string;
}

export class AddCompanyFilterRequestDto implements AddCompanyFilterCommandPayload {
    @IsUUID()
    public readonly corporativeId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly corporativeName: string;

    @IsUUID()
    public readonly companyId: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    public readonly companyRuc: string;

    @IsUUID()
    public readonly userId: string;
}

export class AddCorporativeFilterRequestDto implements AddCorporativeFilterCommandPayload {
    @IsUUID()
    public readonly corporativeId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly corporativeName: string;

    @IsUUID()
    public readonly userId: string;
}