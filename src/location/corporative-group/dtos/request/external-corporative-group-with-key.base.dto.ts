import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty } from "class-validator";
import { ExternalCorporativeGroupRequestDto } from "./external-corporative-group.base.dto";

export class ExternalCorporativeGroupWithKeyRequestDto
    extends ExternalCorporativeGroupRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}