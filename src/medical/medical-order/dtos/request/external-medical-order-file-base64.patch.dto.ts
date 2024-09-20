import { IsBase64, IsMimeType, IsNotEmpty } from "class-validator";

export class PatchExternalMedicalOrderBase64RequestDto {
    @IsBase64()
    @IsNotEmpty()
    public readonly base64: string;

    @IsMimeType()
    @IsNotEmpty()
    public readonly mimetype: string;
}