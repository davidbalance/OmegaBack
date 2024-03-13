import { IsNotEmpty, IsString } from "class-validator";

export class CreateMorbidityGroupDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
