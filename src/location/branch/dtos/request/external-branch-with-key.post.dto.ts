import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExternalBranchRequestDto } from "./external-branch.base.dto";

export class ExternalBranchWithKeyRequestDto
    extends ExternalBranchRequestDto
    implements ExternalConnectionKeyRequest {

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}