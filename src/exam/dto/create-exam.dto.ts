import { IsNotEmpty, IsString } from "class-validator";

export class CreateExamDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
