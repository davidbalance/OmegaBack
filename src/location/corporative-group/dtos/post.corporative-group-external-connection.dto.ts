import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { IsString, IsNotEmpty } from "class-validator";
import { POSTCorporativeGroupRequestDto } from "./post.corporative-group.dto";
import { CorporativeGroupResponseDto } from "./corporative-group.dto";

export class POSTCorporativeGroupExternalConnectionRequestDto
    extends POSTCorporativeGroupRequestDto
    implements ExternalConnectionRequest {

    @IsString()
    @IsNotEmpty()
    source: string;

}

export class POSTCorporativeGroupResponseDto extends CorporativeGroupResponseDto { }