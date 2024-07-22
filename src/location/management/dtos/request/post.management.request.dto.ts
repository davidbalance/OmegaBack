import { IsNotEmpty, IsString } from "class-validator";

export class PostManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}