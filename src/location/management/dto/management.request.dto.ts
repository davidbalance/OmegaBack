import { IsNotEmpty, IsString } from "class-validator";

export class POSTManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class PATCHManagementRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}