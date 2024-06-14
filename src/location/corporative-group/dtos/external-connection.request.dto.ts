import { IsNotEmpty, IsString } from "class-validator";

export class POSTCorporativeGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}

export class PATCHCorporativeGroupRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}