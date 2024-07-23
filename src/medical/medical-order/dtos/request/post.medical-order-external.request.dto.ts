import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { MedicalOrderRequestDto } from "./base.medical-order.request.dto";
import { Type } from "class-transformer";
import { PostBranchWithKeyRequestDto } from "@/location/branch/dtos/request/post.branch-with-key.request.dto";

export class PostMedicalOrderExternalRequestDto extends MedicalOrderRequestDto {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostBranchWithKeyRequestDto)
    public readonly branch: PostBranchWithKeyRequestDto;
}