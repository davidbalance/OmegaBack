import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class POSTLogRequestDto {
    @IsString()
    @IsOptional()
    public level?: string;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    public from?: Date;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    public to?: Date;
}