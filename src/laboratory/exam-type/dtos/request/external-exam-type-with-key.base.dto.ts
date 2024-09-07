import { IsNotEmpty, IsString } from "class-validator";
import { ExternalConnectionKeyRequest } from "@/shared/utils/bases/base.external-connection";
import { ExamTypeRequestDto } from "./exam-type.base.dto";

export class ExternalExamTypeWithKeyRequestDto
    extends ExamTypeRequestDto
    implements ExternalConnectionKeyRequest {

    @IsString()
    @IsNotEmpty()
    public readonly key: string;
}