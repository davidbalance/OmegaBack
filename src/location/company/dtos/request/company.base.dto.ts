import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CompanyRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly ruc: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly phone: string;

    @IsInt()
    public readonly corporativeGroup: number;
}