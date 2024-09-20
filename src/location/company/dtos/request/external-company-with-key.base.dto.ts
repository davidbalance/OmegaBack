import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ExternalCompanyRequestDto } from "./external-company.base.dto";

export class ExternalCompanyWithKeyRequestDto
    extends ExternalCompanyRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly key: string | undefined;
}