import { IsArray, IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class CreateWebClientRequestDTO {
    @IsNumber()
    public readonly user: number;
}

export class UpdateWebClientRoutesRequestDTO {
    @IsArray()
    @IsEmpty()
    public readonly routes: number[];
}

export class UpdateWebClientWebLogoRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    public readonly logo: number;
}