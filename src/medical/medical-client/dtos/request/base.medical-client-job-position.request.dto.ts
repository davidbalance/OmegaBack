import { IsNotEmpty, IsString } from "class-validator";

export class MedicalClientJobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly jobPositionName: string;
}