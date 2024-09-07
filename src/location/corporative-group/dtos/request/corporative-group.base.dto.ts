import { IsString, IsNotEmpty } from "class-validator";

export class CorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}