import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExternalMedicalOrderRequestDto } from "./external-medical-order.base.dto";

export class ExternalMedicalOrderWithKeyRequestDto
    extends ExternalMedicalOrderRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}