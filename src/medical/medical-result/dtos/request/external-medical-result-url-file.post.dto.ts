import { IsNotEmpty, IsUrl } from "class-validator";

export class PostMedicalResultUrlFileRequestDto {
    @IsUrl()
    @IsNotEmpty()
    public readonly url: string;
}