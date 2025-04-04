import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalResponseDto } from "../../dto/response/exam-type-external.dto";

export class ExamTypeExternalModelMapper {
    public static toDTO(value: ExamTypeExternalConnectionModel): ExamTypeExternalResponseDto {
        return {
            typeId: value.typeId,
            typeExternalKey: value.typeExternalKey,
            typeExternalOwner: value.typeExternalOwner
        }
    }
}