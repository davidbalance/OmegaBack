import { IsNotEmpty, IsString } from "class-validator";

export class PostJobPositionRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}