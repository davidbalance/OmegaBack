import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalResponseDto } from "../../dto/response/exam-external.dto";

export class ExamExternalModelMapper {
    public static toDTO(value: ExamExternalConnectionModel): ExamExternalResponseDto {
        return {
            examExternalKey: value.examExternalKey,
            examExternalOwner: value.examExternalOwner,
            examId: value.examId,
            subtypeId: value.subtypeId
        }
    }
}