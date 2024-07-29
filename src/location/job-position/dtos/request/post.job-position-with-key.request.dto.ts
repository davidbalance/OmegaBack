import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { JobPositionRequestDto } from "./base.job-position.request.dto";

export class PostJobPositionWithKeyRequestDto
    extends JobPositionRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}