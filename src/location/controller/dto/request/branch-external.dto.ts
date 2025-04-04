import { CreateBranchFromExternalSourcePayload } from "@omega/location/application/service/create-branch-from-external-source.service";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBranchFromExternalRequestDto implements Omit<CreateBranchFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly companyPhone: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly corporativeId: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRuc: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyAddress: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyId: string;

    @IsString()
    @IsNotEmpty()
    public readonly cityId: number;

    @IsString()
    @IsNotEmpty()
    public readonly branchKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly branchName: string;
}