import { IsNotEmpty, IsString } from "class-validator";

export class POSTCorporativeGroupExternalKeyRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly source: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}