import { IsNotEmpty, IsString } from "class-validator";

export class POSTUserExtraAttributeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly value: string;
}