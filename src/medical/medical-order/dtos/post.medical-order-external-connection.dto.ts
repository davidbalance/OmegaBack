import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { POSTMedicalOrderRequestDto } from "./post.medical-order.dto";
import { Type } from "class-transformer";
import { PostBranchRequestDto } from "@/location/branch/dtos/request/post.branch.request.dto";

export class POSTMedicalOrderWithExternalKeyRequestDto
    extends POSTMedicalOrderRequestDto
    implements ExternalConnectionRequest {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostBranchRequestDto)
    public readonly branch: PostBranchRequestDto;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly source: string;

}