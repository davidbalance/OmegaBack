import { IsBase64, IsMimeType, IsNotEmpty, MaxLength } from "class-validator";

export class PostMedicalResultBase64FileRequestDto {
    @IsBase64()
    @IsNotEmpty()
    public readonly base64: string;

    @IsMimeType()
    @IsNotEmpty()
    public readonly mimetype: string;
}