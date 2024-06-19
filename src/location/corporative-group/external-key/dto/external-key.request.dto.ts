import { IsNotEmpty, IsString } from "class-validator";

export class CreateCorporativeGroupExternalKey {
    @IsString()
    @IsNotEmpty()
    public readonly source: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}