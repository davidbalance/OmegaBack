import { IsString, IsNotEmpty } from "class-validator";

export class PostCorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}