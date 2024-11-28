import { IsArray, IsDefined, IsNotEmpty, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { MedicalResultRequestDto } from "@/medical/medical-result/dtos/request/medical-result.base.dto";
import { MedicalOrderRequestDto } from "@/medical/medical-order/dtos/request/medical-order.base.dto";

class SubMedicalResultRequestDto extends OmitType(MedicalResultRequestDto, ['order']) { }

export class LocalMedicalResultOrderRequestDto extends MedicalOrderRequestDto {
    @IsDefined()
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => SubMedicalResultRequestDto)
    public readonly results: SubMedicalResultRequestDto[];
}