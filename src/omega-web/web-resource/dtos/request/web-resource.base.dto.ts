import { IsNotEmpty, IsString } from "class-validator";

export class WebResourceRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly label: string;

    @IsString()
    @IsNotEmpty()
    public readonly address: string;

    @IsString()
    @IsNotEmpty()
    public readonly icon: string;
}