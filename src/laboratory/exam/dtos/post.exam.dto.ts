import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { IsNotEmpty, IsString } from "class-validator";

export class POSTExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class POSTExamExternalConnectionRequestDto
    extends POSTExamRequestDto
    implements ExternalConnectionRequest {

    @IsString()
    @IsNotEmpty()
    public readonly source: string;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;


}