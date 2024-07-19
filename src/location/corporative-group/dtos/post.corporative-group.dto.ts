import { IsString, IsNotEmpty } from "class-validator";

export class POSTCorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}

