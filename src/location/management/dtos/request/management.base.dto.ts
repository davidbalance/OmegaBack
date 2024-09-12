import { IsNotEmpty, IsString } from "class-validator";

export class ManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}