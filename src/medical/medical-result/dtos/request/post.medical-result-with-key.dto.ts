import { IsNotEmpty, IsString } from "class-validator";
import { PostMedicalOrderExternalRequestDto } from "@/medical/medical-order/dtos/request/post.medical-order-external.request.dto";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";

export class PostMedicalResultWithKeyExternalRequestDto
    extends PostMedicalOrderExternalRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}