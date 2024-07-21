import { POSTBranchRequestDto } from "@/location/branch/dtos/post.branch.dto";
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
    @Type(() => POSTBranchRequestDto)
    public readonly branch: POSTBranchRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => POSTPatientWithEmailRequestDto)
    public readonly patient: POSTPatientWithEmailRequestDto;

    @IsString()
    public readonly process: string;
}
