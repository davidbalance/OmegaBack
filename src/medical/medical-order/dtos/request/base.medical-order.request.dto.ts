import { PostBranchRequestDto } from "@/location/branch/dtos/request/post.branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsString, IsEmail } from "class-validator";

class PatientWithEmailRequestDto extends POSTPatientRequestDto {
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
