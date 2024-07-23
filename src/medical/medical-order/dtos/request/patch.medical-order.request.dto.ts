import { IsNotEmpty, IsString } from "class-validator";

export class PatchMedicalOrderRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}