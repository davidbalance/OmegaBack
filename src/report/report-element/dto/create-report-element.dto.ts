import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ReportElementType } from "src/report/common/enums";

export class CreateReportElementDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsEnum(ReportElementType)
    public type: ReportElementType;
    @IsOptional()
    @IsBoolean()
    public mandatory: boolean;

}
