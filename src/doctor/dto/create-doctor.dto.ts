import { IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    public readonly signature: string;
}
