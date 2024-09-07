import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class BranchRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly city: string;

    @IsInt()
    public readonly company: number;
}