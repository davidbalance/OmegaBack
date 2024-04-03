import { IsArray, IsEmpty, IsNumber } from "class-validator";

export class CreateWebClientRequestDTO {
    @IsNumber()
    public readonly user: number;
}

export class UpdateWebClientRoutesRequestDTO {
    @IsArray()
    @IsEmpty()
    public readonly routes: number[];
}