import { ExamSubtypeExternalConnectionModel } from "@prisma/client";
import { ExamSubtypeExternalResponseDto } from "../../dto/response/exam-subtype-external.dto";

export class ExamSubtypeExternalModelMapper {
    public static toDTO(value: ExamSubtypeExternalConnectionModel): ExamSubtypeExternalResponseDto {
        return {
            subtypeId: value.subtypeId,
            subtypeExternalKey: value.subtypeExternalKey,
            subtypeExternalOwner: value.subtypeExternalOwner,
            typeId: value.typeId
        }
    }
}