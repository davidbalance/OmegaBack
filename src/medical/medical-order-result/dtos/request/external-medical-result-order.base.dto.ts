import { IsArray, IsDefined, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { ExternalMedicalResultRequestDto } from "../../../medical-result/dtos/request/external-medical-result.base.dto";
import { ExternalMedicalOrderRequestDto } from "@/medical/medical-order/dtos/request/external-medical-order.base.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";

class SubMedicalResultRequestDto
    extends OmitType(ExternalMedicalResultRequestDto, ['file', 'order'])
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly key: string | undefined | null;
}

export class ExternalMedicalResultOrderRequestDto extends ExternalMedicalOrderRequestDto {
    @IsDefined()
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => SubMedicalResultRequestDto)
    public readonly results: SubMedicalResultRequestDto[];
}