import { IsNotEmpty, IsString } from "class-validator";

export class PatchExternalMedicalOrderRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}