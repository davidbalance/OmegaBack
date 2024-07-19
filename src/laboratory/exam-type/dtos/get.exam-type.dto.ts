import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { ExamTypeResponse } from "./exam-type.dto";

export class GETExamTypeResponseDto extends ExamTypeResponse { }

export class GETExamTypeArrayResponseDto extends ObjectArrayResponse<GETExamTypeResponseDto> { }