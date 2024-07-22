import { PostBranchRequestDto } from "@/location/branch/dtos/request/post.branch.request.dto";
import { POSTPatientRequestDto } from "@/user/patient/dtos/post.patient-management,dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsString, IsEmail } from "class-validator";

class POSTPatientWithEmailRequestDto extends POSTPatientRequestDto {
    @IsEmail()
    public readonly email: string;
}

export class POSTMedicalOrderRequestDto {

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
    @Type(() => POSTPatientWithEmailRequestDto)
    public readonly patient: POSTPatientWithEmailRequestDto;

    @IsString()
    public readonly process: string;
}
