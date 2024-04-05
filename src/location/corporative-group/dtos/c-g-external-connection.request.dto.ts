import { IsNotEmpty, IsString } from "class-validator";

export class CreateCorporativeGroupExternalRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}

export class FindCorporativeGroupAndUpdateRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}