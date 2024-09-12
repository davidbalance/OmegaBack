import { IsString, IsNotEmpty } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExamExternalRequestDto } from "./external-exam.base.dto";

export class ExternalExamWithKeyRequestDto
    extends ExamExternalRequestDto
    implements ExternalConnectionKeyRequest {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}