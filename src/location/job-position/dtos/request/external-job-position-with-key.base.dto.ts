import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExternalJobPositionRequestDto } from "./external-job-position.base.dto";

export class ExternalJobPositionWithKeyRequestDto
    extends ExternalJobPositionRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}