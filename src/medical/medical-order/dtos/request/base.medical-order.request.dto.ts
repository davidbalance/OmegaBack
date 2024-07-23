import { PostBranchRequestDto } from "@/location/branch/dtos/request/post.branch.request.dto";
import { PostPatientRequestDto } from "@/user/patient/dtos/request/post.patient.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsString, IsEmail } from "class-validator";

class PatientWithEmailRequestDto extends PostPatientRequestDto {
    @IsEmail()
    public readonly email: string;
}

export class MedicalOrderRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostBranchRequestDto)
    public readonly branch: PostBranchRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PatientWithEmailRequestDto)
    public readonly patient: PatientWithEmailRequestDto;

    @IsString()
    public readonly process: string;
}
