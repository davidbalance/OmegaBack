import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { ExamSubtypeResponse } from "./exam-subtype.dto";

export class GETExamSubtypeResponseDto extends ExamSubtypeResponse { }

export class GETExamSubtypeArrayResponseDto extends ObjectArrayResponse<GETExamSubtypeResponseDto> { }