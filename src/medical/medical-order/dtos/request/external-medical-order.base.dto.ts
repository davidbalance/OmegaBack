import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsEmail, IsOptional } from "class-validator";
import { MedicalOrderRequestDto } from "./medical-order.base.dto";
import { ExternalBranchWithKeyRequestDto } from "@/location/branch/dtos/request/external-branch-with-key.post.dto";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";
import { PatientRequestDto } from "@/user/patient/dtos/request/patient.base.dto";

class PatientWithEmailRequestDto extends PatientRequestDto {
    @IsEmail()
    public readonly email: string;
}

export class ExternalMedicalOrderRequestDto extends OmitType(MedicalOrderRequestDto, ['corporativeName', 'companyName', 'companyRuc', 'branchName', 'patientDni']) {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => ExternalBranchWithKeyRequestDto)
    public readonly branch: ExternalBranchWithKeyRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PatientWithEmailRequestDto)
    public readonly patient: PatientWithEmailRequestDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ExternalJobPositionWithKeyRequestDto)
    public readonly jobPosition?: ExternalJobPositionWithKeyRequestDto;
}
