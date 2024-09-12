import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExamSubtypeExternalRequestDto } from "./external-exam-subtype.base.dto";

export class ExternalExamSubtypeWithKeyRequestDto
    extends ExamSubtypeExternalRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}