import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamResponseDto } from "../../dto/response/exam.dto";

export class ExamModelMapper {
    public static toDTO(value: ExamModel): ExamResponseDto {
        return {
            examId: value.examId,
            examName: value.examName,
            subtypeId: value.subtypeId
        }
    }
}