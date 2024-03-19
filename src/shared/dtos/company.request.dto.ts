import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateCompanyRequestDTO {
    @IsString()
    @Length(13, 13)
    public readonly ruc: string;

    @IsNumber()
    public readonly corporativeGroup: number;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsPhoneNumber()
    public readonly phone: string;
}

export class FindOneOrCreateCompanyRequestDTO extends CreateCompanyRequestDTO {
    public readonly lookup: number;
}

export class UpdateCompanyRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsPhoneNumber()
    public readonly phone: string;
}

export class UpdateCompanyRUCRequestDTO {
    @IsString()
    @Length(13, 13)
    public readonly ruc: string;
}

export class UpdateCompanyCorporativeGroupRequestDTO {
    @IsNumber()
    public readonly corporativeGroup: number;
}