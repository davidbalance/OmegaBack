import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { POSTJobPositionRequestDto } from "./post.job-position.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class POSTJobPositionExternalConnectionRequestDto
    extends POSTJobPositionRequestDto
    implements ExternalConnectionRequest {

    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly source: string;
}