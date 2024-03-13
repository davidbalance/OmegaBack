import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Send } from "src/medical-order/send/entities/send.entity";

export class CreateResultDto {
    @IsString()
    @IsNotEmpty()
    public readonly filename: string;
    @IsString()
    @IsNotEmpty()
    public readonly path: string;
    @IsOptional()
    @IsArray()
    public readonly sends: Send[];

}
