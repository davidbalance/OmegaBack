import { IsArray, IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class CreateWebClientRequestDto {
    @IsNumber()
    public readonly user: number;
}

export class UpdateWebClientRoutesRequestDto {
    @IsArray()
    @IsEmpty()
    public readonly routes: number[];
}

export class UpdateWebClientWebLogoRequestDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly logo: number;
}

export class UpdateWebClientWebResourcesRequestDto {
    @IsArray()
    @IsNotEmpty()
    public readonly resources: number[];
}