import { IsNotEmpty, IsString } from "class-validator";

export class CreateMorbidityGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class UpdateMorbidityGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}