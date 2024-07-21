import { IsNotEmpty, IsString } from "class-validator";

export class PATCHMedicalOrderProcessRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}