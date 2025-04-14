import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeResponseDto } from "../../dto/response/exam_subtype.dto";

export class ExamSubtypeModelMapper {
    public static toDTO(value: ExamSubtypeModel): ExamSubtypeResponseDto {
        return {
            subtypeId: value.subtypeId,
            subtypeName: value.subtypeName,
            hasExams: value.hasExams,
        }
    }
}