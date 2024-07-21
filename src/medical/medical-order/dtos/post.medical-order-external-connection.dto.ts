import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { POSTMedicalOrderRequestDto } from "./post.medical-order.dto";
import { Type } from "class-transformer";
import { POSTBranchWithExternalKeyRequestDto } from "@/location/branch/dtos/post.branch.dto";

export class POSTMedicalOrderWithExternalKeyRequestDto
    extends POSTMedicalOrderRequestDto
    implements ExternalConnectionRequest {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => POSTBranchWithExternalKeyRequestDto)
    public readonly branch: POSTBranchWithExternalKeyRequestDto;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly source: string;

}