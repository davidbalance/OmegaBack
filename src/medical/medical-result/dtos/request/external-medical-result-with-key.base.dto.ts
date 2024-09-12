import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExternalMedicalResultRequestDto } from "./external-medical-result.base.dto";

export class ExternalMedicalResultWithKeyRequestDto
    extends ExternalMedicalResultRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}