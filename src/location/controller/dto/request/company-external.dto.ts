import { CreateCompanyFromExternalSourcePayload } from "@omega/location/application/service/create-company-from-external-source.service";
import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateCompanyFromExternalRequestDto implements Omit<CreateCompanyFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly corporativeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyKey: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    public readonly companyRuc: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyAddress: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyPhone: string;
}