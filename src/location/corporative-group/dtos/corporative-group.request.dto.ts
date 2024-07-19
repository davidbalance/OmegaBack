import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { IsNotEmpty, IsString } from "class-validator";

export class POSTCorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}

export class PATCHCorporativeGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class POSTCorporativeGroupExternalKeyRequestDto
    extends POSTCorporativeGroupRequestDto
    implements ExternalConnectionRequest {

    @IsString()
    @IsNotEmpty()
    source: string;

}